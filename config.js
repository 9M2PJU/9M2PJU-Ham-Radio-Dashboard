const disableSetup = true;
var topBarCenterText = "🇲🇾 9M2PJU Ham Radio Dashboard";
// Grid layout
var layout_cols = 4;
var layout_rows = 3;

// Menu items
// Structure is as follows HTML Color code, Option, target URL, scaling 1=Original Size, side (optional, nothing is Left, "R" is Right)
// The values are [color code, menu text, target link, scale factor, side],
// add new lines following the structure for extra menu options. The comma at the end is important!
var aURL = [
  [
    "#2196f3",
    "RBN",
    "https://reversebeacon.net/main.php?zoom=24.02,48.53,1.90&rows=10&max_age=10,hours&hide=distance_km",
    1,
    "undefined"
  ],
  [
    "#2196f3",
    "CONTEST CALENDAR",
    "https://www.contestcalendar.com/fivewkcal.html",
    1,
    "undefined"
  ],
  [
    "#2196f3",
    "DX CLUSTER",
    "https://web.cluster.iz3mez.it",
    1,
    "undefined"
  ],
  [
    "#2196f3",
    "LIGHTNING",
    "https://map.blitzortung.org/#6.08/4.123/109.318",
    1,
    "R"
  ],
  [
    "#2196f3",
    "APRS MAP",
    "https://maps.hamradio.my",
    1,
    "undefined"
  ],
  [
    "#2196f3",
    "TIME",
    "https://time.is/",
    1,
    "R"
  ],
  [
    "#2196f3",
    "WEATHER",
    "https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=3.0418&lon=101.1731&zoom=7",
    1,
    "R"
  ],
  [
    "#2196f3",
    "WINDS",
    "https://earth.nullschool.net/#current/wind/surface/level/orthographic=-250.62,2.37,1865/loc=107.017,2.805",
    1,
    "R"
  ],
  [
    "#000000",
    "RAIN",
    "https://www.accuweather.com/en/my/national/weather-radar",
    1,
    "R"
  ],
  [
    "#000000",
    "DX CLUSTER MAP",
    "https://dxcluster.dxcenter.com/",
    1,
    ""
  ]
];

var aIMG = [
  [
    "MALAYSIA RADAR",
    "https://www.met.gov.my/data/radar_malaysia.gif?nocache=1742537882274"
  ],
  [
    "MALAYSIA NOWCAST",
    "https://api.met.gov.my/static/images/swirl-latest.gif?nocache=1751342426058"
  ],
  [
    "MALAYSIA LIGHTNING",
    "https://images.lightningmaps.org/blitzortung/oceania/index.php?map=indonesia&period=0.25"
  ],
  [
    "WIND",
    "iframe|https://earth.nullschool.net/#current/wind/surface/level/orthographic=-249.94,4.31,1146"
  ],
  [
    "WORLD SEISMIC",
    "iframe|https://www.arcgis.com/apps/View/index.html?appid=e59532bdfb334b1da691f74e7e879685"
  ],
  [
    "LIVE DX MAP",
    "iframe|https://dxlook.com/?view=summary"

  ],
  [
    "GREY LINE",
    "https://www.timeanddate.com/scripts/sunmap.php?iso=now"
  ],
  [
    "NOAA D-RAP",
    "https://services.swpc.noaa.gov/images/animations/d-rap/global/d-rap/latest.png"
  ],
  [
    "IONOSPHERIC",
    "https://www.sws.bom.gov.au/Images/HF%20Systems/Global%20HF/Ionospheric%20Map/East/fof2_maps.png"
  ],
  [
    "HF PROPAGATION",
    "https://www.hamqsl.com/solar101vhf.php",
    "https://www.hamqsl.com/solarmap.php",
    "https://services.swpc.noaa.gov/images/swx-overview-large.gif",
    "https://services.swpc.noaa.gov/images/animations/wam-ipe/wfs_ionosphere_new/latest.png"
  ],
  [
    "MUF",
    "https://prop.kc2g.com/renders/current/mufd-normal-now.svg",
    "https://www.hamqsl.com/solargraph.php",
    "https://www.hamqsl.com/solarmuf.php"
  ],
  [
    "ISS TRACK",
    "iframe|https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544"
  ]
];

// Image rotation intervals in milliseconds per tile - If the line below is commented, all tiles will be rotated every 30000 milliseconds (30s)
// tileDelay array sets the rotation interval (in ms) for each dashboard tile, in order.
// Set to 1 minute (60000 ms) for each tile.
var tileDelay = [
  60000, 60000, 60000, 60000,
  60000, 60000, 60000, 60000,
  60000, 60000, 60000, 60000
];

// RSS feed items
// Structure is [feed URL, refresh interval in minutes]
var aRSS = [
  ["https://www.amsat.org/feed/", 120],           // Example RSS feed, refresh every 60 minutes
  ["https://daily.hamweekly.com/atom.xml", 120], // Example Atom feed, refresh every 120 minutes
  ];
