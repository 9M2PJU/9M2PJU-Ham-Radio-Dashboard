const disableSetup = true;
var topBarCenterText = "9M2PJU Ham Radio Dashboard";
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
    "CLUBLOG",
    "https://clublog.org/livestream/9M2PJU",
    1,
    "undefined"
  ],
  [
    "#2196f3",
    "CONTEST",
    "https://www.contestcalendar.com/fivewkcal.html",
    1,
    "undefined"
  ],
  [
    "#2196f3",
    "DX CLUSTER",
    "https://cluster.f5len.org",
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
    "APRS Maps",
    "https://maps.hamradio.my",
    1,
    "undefined"
  ],
  [
    "#2196f3",
    "TIME.IS",
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
    "DX CLUSTER MAPS",
    "https://dxcluster.dxcenter.com/",
    1,
    ""
  ]
];

// Dashboard items
// Structure is Title, Image Source URL
// [Title, Image Source URL],
// the comma at the end is important!
// You can't add more items because there are only 12 placeholders on the dashboard
// but you can replace the titles and the images with anything you want.
var aIMG = [
  [
    "RADAR",
    "https://www.met.gov.my/data/radar_malaysia.gif?nocache=1742537882274"
  ],
  [
    "MALAYSIA NOWCASTING",
    "https://api.met.gov.my/static/images/swirl-latest.gif?nocache=1751342426058"
  ],
  [
    "LIGHTNING",
    "https://images.lightningmaps.org/blitzortung/oceania/index.php?map=indonesia&period=0.25"
  ],
  [
    "WIND",
    "iframe|https://earth.nullschool.net/#current/wind/surface/level/orthographic=-249.94,4.31,1146"
  ],
  [
    "SEISMIC",
    "https://www.arcgis.com/apps/View/index.html?appid=e59532bdfb334b1da691f74e7e879685"
  ],
  
  [
    "DX MAP",
    "https://dxlook.com/?view=summary"
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
    "iframe|https://www.hamqsl.com/solarmuf.php",
    "iframe|https://www.hamqsl.com/solarmap.php",
    "https://services.swpc.noaa.gov/images/swx-overview-large.gif",
    "https://services.swpc.noaa.gov/images/animations/wam-ipe/wfs_ionosphere_new/latest.png"
  ],
  [
    "MUF",
    "https://prop.kc2g.com/renders/current/mufd-normal-now.svg"
  ],
  [
    "ISS TRACK",
    "iframe|https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544"
  ]
];

// Image rotation intervals in milliseconds per tile - If the line below is commented, all tiles will be rotated every 30000 milliseconds (30s)
var tileDelay = [
  11200,10000,31000,30100,
  30200,10500,10300,30600,
  30400,60700,60900,10800
];

// RSS feed items
// Structure is [feed URL, refresh interval in minutes]
var aRSS = [
  ["https://www.amsat.org/feed/", 60],           // Example RSS feed, refresh every 60 minutes
  ["https://daily.hamweekly.com/atom.xml", 120], // Example Atom feed, refresh every 120 minutes
  ];
