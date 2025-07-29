// Disable setup menu
const disableSetup = true;

// Top bar center text
var topBarCenterText = "9M2PJU Ham Radio Dashboard";

// Grid layout
var layout_cols = 4;
var layout_rows = 3;

// Menu items
// Format: [color, label, URL, scale, side ("R" = right, "" = left/default)]
var aURL = [
  ["#2196f3", "CLUBLOG", "https://clublog.org/livestream/9M2PJU", 1, ""],
  ["#2196f3", "CONTEST", "https://www.contestcalendar.com/fivewkcal.html", 1, ""],
  ["#2196f3", "DX CLUSTER", "https://cluster.f5len.org", 1, ""],
  ["#2196f3", "LIGHTNING", "https://map.blitzortung.org/#6.08/4.123/109.318", 1, "R"],
  ["#2196f3", "APRS Maps", "https://maps.hamradio.my", 1, ""],
  ["#2196f3", "TIME.IS", "https://time.is/", 1, "R"],
  ["#2196f3", "WEATHER", "https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=3.0418&lon=101.1731&zoom=7", 1, "R"],
  ["#2196f3", "WINDS", "https://earth.nullschool.net/#current/wind/surface/level/orthographic=-250.62,2.37,1865/loc=107.017,2.805", 1, "R"],
  ["#000000", "RAIN", "https://www.accuweather.com/en/my/national/weather-radar", 1, "R"],
  ["#000000", "DX CLUSTER MAPS", "https://dxcluster.dxcenter.com/", 1, ""]
];

// Dashboard items
// Format: [Title, Image URL or "iframe|URL"]
// Only 12 items are supported (4 cols x 3 rows)
var aIMG = [
  ["RADAR", "https://www.met.gov.my/data/radar_malaysia.gif?nocache=1742537882274"],
  ["NOAA D-RAP", "https://services.swpc.noaa.gov/images/animations/d-rap/global/d-rap/latest.png"],
  ["DX MAP", "iframe|https://dxlook.com/?view=summary"],
  ["WIND", "iframe|https://zoom.earth/places/malaysia/#map=wind-speed/model=icon"],
  ["RAIN", "iframe|https://www.rainviewer.com/map.html?loc=4.2045,107.0304,5&oC=true&oCS=1&c=3&o=83&lm=1&layer=radar&sm=1&sn=1"],
  ["LIGHTNING", "https://images.lightningmaps.org/blitzortung/oceania/index.php?map=indonesia&period=0.25"],
  ["ISS LIVE STREAM", "iframe|https://www.youtube.com/embed/H999s0P1Er0?autoplay=1&mute=1"],
  ["ADS-B", "iframe|https://globe.adsb.fi/"],
  ["ISS LIVE TRACK", "iframe|https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544"],
  ["HF PROPAGATION", "https://www.hamqsl.com/solar101vhf.php"],
  ["MUF", "https://prop.kc2g.com/renders/current/mufd-normal-now.svg"],
  ["MALAYSIA NOWCASTING", "https://api.met.gov.my/static/images/swirl-latest.gif?nocache=1751342426058"]
];

// Image rotation intervals (in ms), must match aIMG length
var tileDelay = [
  11200, 10000, 11000, 10100,
  10200, 10500, 10300, 10600,
  30400, 60700, 60900, 10800
];

// RSS feed sources
// Format: [Feed URL, Refresh interval in minutes]
var aRSS = [
  ["https://www.amsat.org/feed/", 60],
  ["https://daily.hamweekly.com/atom.xml", 120]
];
