<?php

require('./lib/autoloader.php');

$NOW = new DateTime('now', new DateTimeZone('America/Los_Angeles'));

// Get the route from the query string
$route = ($_GET['route'] ? $_GET['route'] : 'bainbridge-seattle');
$allowedRoutes = array(
  'bainbridge-seattle',
  'kingston-edmonds',
  'clinton-mukilteo',
  'bremerton-seattle',
);

if (!in_array($route, $allowedRoutes)) {
  header('Status: 301');
  header('Location: /');
}

$parts = explode('-', $route);
$from = strtolower($parts[0]);
$to = strtolower($parts[1]);
$schedule = array();
$to_port = ucwords($to);
$from_port = ucwords($from);


$alerts = getRouteAlerts($from, $to);

// Build the schedule entry
$schedule = array_merge(
  getRouteSchedule($from, $to),
  getRouteSchedule($to, $from));
  
$compacted_schedule = array();
foreach($schedule as $d) {
  extract($d);
  
  if (isset($compacted_schedule[$minutes_till])) {
    if ($direction == 'west') {
      $compacted_schedule[$minutes_till]['west'] = true;
    } else  {
      $compacted_schedule[$minutes_till]['east'] = true;
    }
  } else {
    $compacted_schedule[$minutes_till] = array(
      'minutes_till' => $minutes_till,
      'departure' => $departure,
      'm_till' => $m_till,
      'h_till' => $h_till,
      'status' => $status,
      'west' => ($direction == 'west'),
      'east' => ($direction == 'east'),
    );
  }
}

$schedule = $compacted_schedule;
  
usort($schedule, function ($a, $b) {
  if ($a['minutes_till'] === $b['minutes_till']) return 0;
  else if ($a['minutes_till'] <= $b['minutes_till']) return -1;
  else return 1;
});

/*
printf('<pre>%s</pre>', print_r($schedule, true));
die;
*/


?>
<!DOCTYPE HTML>
<html>
<head>
  <title><?= $from_port ?>-<?= $to_port ?> Ferry &mdash; cleer.net</title>

  <meta name="description" content="The upcoming route runs for the <?= $from_port ?>-<?= $to_port ?> Washington State Ferry.">
  <meta name="viewport" content="initial-scale=1, user-scalable=no">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="refresh" content="60;URL=/ferries/?route=<?= $route ?>"/>

  <link rel="stylesheet" href="./style.css"/>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
    ga('create', 'UA-40909446-1', 'cleer.net');
    ga('send', 'pageview');
  </script>

</head>
<body>

  <div class="ferry-schedule">
    <div class="heading" onclick="toggle_routes()">
      <h1><?= $from_port ?></h1>
      <h2><?= $to_port ?></h2>
    </div>

    <ul class="routes" style="display: none">
      <li><a href="/ferries/?route=clinton-mukilteo">Clinton<br/>Mukilteo</a></li>
      <li><a href="/ferries/?route=kingston-edmonds">Kingston<br/>Edmonds</a></li>
      <li><a href="/ferries/?route=bainbridge-seattle">Bainbridge<br/>Seattle</a></li>
      <li><a href="/ferries/?route=bremerton-seattle">Bremerton<br/>Seattle</a></li>
    </ul>

  <?php foreach ($alerts as $message): ?>
    <div class="route-alert"><strong>ALERT:</strong> <?= $message ?></div>
  <?php endforeach; ?>

  <?php foreach ($schedule as $item): extract($item); ?>
    <div class="departure <?= $status ?>">
      <?php if ($east): ?>
      <div class="route-from"><?= $departure ?></div>
      <?php endif; ?>

      <?php if ($west): ?>
      <div class="route-to"><?= $departure ?></div>
      <?php endif; ?>

      <div class="timer">
        <?php if ($minutes_till <= 2): ?>
          Now!
        <?php elseif ($minutes_till > 60): ?>
          <table cellpadding="0"><tr>
            <td><?= $h_till ?></td>
            <td><strong>h</strong>&nbsp;</td>
            <td><?= $m_till ?></td>
            <td><strong>m</strong></td>
          </tr></table>
        <?php else: ?>
          <?= $minutes_till ?> <strong>mins</strong>
        <?php endif; ?>
      </div>
    </div>
  <?php endforeach; ?>
  </div>

  <script>
  	function toggle_routes() {
    	var routes = document.getElementsByClassName('routes');
    	
      for(var i=0; i < routes.length; i++) {
        switch(routes[i].style.display) {
        case 'block':
          routes[i].style.display = 'none';
          break;
        default:
          routes[i].style.display = 'block';
          break;
        }
      }
    	
  	}
  </script>

</body>
</html>
<?php

function getRouteSchedule($from, $to) {
  global $NOW;
  $feed = new SimplePie();
  $feed->enable_cache(true);
  $feed->set_feed_url(getRouteScheduleFeed($from, $to));
  $feed->init();
  $feed->handle_content_type();

  $result = array();
  $direction = getRouteDirection($from.'-'.$to);

  foreach ($feed->get_items() as $item) {
    // Determine the minutes to departure 
    // NOTE: Sometimes dates are 'n/d/y - h:i', without the AM/PM value.
    // Need to find a good way to handle bad date times being entered into the feed.
    $departs = DateTime::createFromFormat('n/d/Y - h:i a', $item->get_title(), new DateTimeZone('America/Los_Angeles'));
    $interval = $departs->diff($NOW);
    $int_minutes = (int) $interval->format('%i');
    $int_hours = (int) $interval->format('%h') - 0;
    $minutes_till = ($int_hours * 60) + $int_minutes;
    $minutes_till = ($interval->invert ? 1 : -1) * $minutes_till;

    if ($minutes_till <= 0) continue;

    $result[] = array(
      'departs' => $departs,
      'departure' => $departs->format('g:ia'),
      'minutes_till' => $minutes_till,
      'm_till' => $interval->i,
      'h_till' => $interval->h,
      'status' => routeStatus($minutes_till),
      'direction' => $direction,
    );

    unset($departs);
  }
  unset($feed);

  return $result;
}

function getRouteAlerts($from, $to) {
  global $NOW;
  $feed = new SimplePie();
  $feed->enable_cache(true);
  $feed->set_feed_url(getRouteAlertsFeed($from, $to));
  $feed->init();
  $feed->handle_content_type();

  $result = array();
  foreach ($feed->get_items() as $item) {
    $alert = $item->get_title();
    if (strpos($alert, 'Currently, there are no alerts') === false) {
      $alert = preg_replace('/^\[.*?\]/i', '', $alert);
    
      $result[] = $alert;
    }
  }
  
  return $result;
}

function getRouteAlertsFeed($from, $to) {
  $urlBase = 'http://www.wsdot.com/ferries/schedule/RSSFeeds/RouteAlerts.aspx';
  $terminal = array(
    'bainbridge' => 3,
    'seattle' => 7,
    'kingston' => 12,
    'edmonds' => 8,
    'clinton' => 14,
    'mukilteo' => 5,
    'bremerton' => 4,
  );

  $urlQuery = array(
    'departingterm' => $terminal[$from],
    'arrivingterm' => $terminal[$to],
  );

  return $urlBase . '?' . http_build_query($urlQuery);
}

function getRouteScheduleFeed($from, $to) {
  $urlBase = 'http://www.wsdot.wa.gov/ferries/schedule/RSSFeeds/RemainingSailingsToday.aspx';
  $terminal = array(
    'bainbridge' => 3,
    'seattle' => 7,
    'kingston' => 12,
    'edmonds' => 8,
    'clinton' => 14,
    'mukilteo' => 5,
    'bremerton' => 4,
  );

  $urlQuery = array(
    'departingterm' => $terminal[$from],
    'arrivingterm' => $terminal[$to],
    'onlyremainingtimes' => 'true',
  );

  return $urlBase . '?' . http_build_query($urlQuery);
}

function getRouteDirection($route) {
  switch ($route) {
  case 'bainbridge-seattle':
  case 'kingston-edmonds':
  case 'clinton-mukilteo':
  case 'bremerton-seattle':
    $direction = 'east';
    break;
  default:
    $direction = 'west';
    break;
  }
  
  return $direction;
}

function routeStatus($minutes) {
  if ($minutes <= 2) {
    $class = 'alert';
  } else if ($minutes <= 15) {
    $class = 'caution';
  } else if ($minutes <= 60) {
    $class = 'good';
  } else {
    $class = 'normal';
  }

  return $class;
}
