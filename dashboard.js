      window.addEventListener('DOMContentLoaded', () => {
        console.log('►►► DOMContentLoaded fired');
      });

      window.addEventListener('load', () => {
        console.log('►►► Page fully loaded');
      });

      console.log('►►► Script loaded and running');

      /* ===== Toast notification helper (replaces alert) ===== */
      function showToast(message, type = 'info', duration = 3500) {
        let container = document.getElementById('toast-container');
        if (!container) {
          container = document.createElement('div');
          container.id = 'toast-container';
          document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.textContent = message;
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.remove(), 300);
        }, duration);
      }

      /* ===== Hamburger menu toggle buttons (mobile) ===== */
      function setupMenuToggles() {
        const leftBtn = document.createElement('button');
        leftBtn.className = 'menu-toggle left';
        leftBtn.setAttribute('aria-label', 'Open left menu');
        leftBtn.innerHTML = '&#9776;';
        const rightBtn = document.createElement('button');
        rightBtn.className = 'menu-toggle right';
        rightBtn.setAttribute('aria-label', 'Open right menu');
        rightBtn.innerHTML = '&#9776;';
        document.body.appendChild(leftBtn);
        document.body.appendChild(rightBtn);

        const leftMenu = document.getElementById('myMenu');
        const rightMenu = document.getElementById('myMenuR');

        function closeBoth() {
          if (leftMenu) leftMenu.classList.remove('open');
          if (rightMenu) rightMenu.classList.remove('open');
        }
        leftBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          rightMenu && rightMenu.classList.remove('open');
          leftMenu && leftMenu.classList.toggle('open');
        });
        rightBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          leftMenu && leftMenu.classList.remove('open');
          rightMenu && rightMenu.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
          if (!e.target.closest('#myMenu') && !e.target.closest('#myMenuR') &&
              !e.target.closest('.menu-toggle')) {
            closeBoth();
          }
        });
        // Close after picking an option
        [leftMenu, rightMenu].forEach(m => {
          if (!m) return;
          m.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') closeBoth();
          });
        });
      }

      /* ===== Touch gesture helpers ===== */
      // Long-press -> rotate image (mobile equivalent of right-click)
      function attachLongPressRotate(el) {
        let timer = null;
        let startX = 0, startY = 0, moved = false;
        el.addEventListener('touchstart', (e) => {
          if (e.touches.length !== 1) return;
          moved = false;
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
          timer = setTimeout(() => {
            if (!moved) {
              const fakeEvent = { preventDefault: () => {}, target: el };
              rotate(fakeEvent);
              if (navigator.vibrate) navigator.vibrate(15);
            }
          }, 500);
        }, { passive: true });
        el.addEventListener('touchmove', (e) => {
          if (e.touches.length !== 1) return;
          const dx = e.touches[0].clientX - startX;
          const dy = e.touches[0].clientY - startY;
          if (Math.abs(dx) > 10 || Math.abs(dy) > 10) { moved = true; clearTimeout(timer); }
        }, { passive: true });
        el.addEventListener('touchend', () => clearTimeout(timer), { passive: true });
        el.addEventListener('touchcancel', () => clearTimeout(timer), { passive: true });
      }

      // Pinch-zoom for the fullscreen image (touch equivalent of wheelzoom)
      function attachPinchZoom(imgEl) {
        let initialDist = 0;
        let initialScale = 1;
        let currentScale = 1;
        imgEl.addEventListener('touchstart', (e) => {
          if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            initialDist = Math.hypot(dx, dy);
            initialScale = currentScale;
          }
        }, { passive: true });
        imgEl.addEventListener('touchmove', (e) => {
          if (e.touches.length === 2 && initialDist > 0) {
            e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            currentScale = Math.max(1, Math.min(5, initialScale * (dist / initialDist)));
            imgEl.style.transform = `scale(${currentScale})`;
          }
        }, { passive: false });
        imgEl.addEventListener('touchend', (e) => {
          if (e.touches.length === 0) initialDist = 0;
        }, { passive: true });
      }

      function getColumnHeaderTitle(tableId, columnNumber) {
        const table = document.getElementById(tableId);
        if (!table) {
          console.error(`Table with id ${tableId} not found.`);
          return null;
        }

        const headers = table.querySelectorAll("thead th");
        if (columnNumber < 0 || columnNumber >= headers.length) {
          console.error(`Invalid column number ${columnNumber}.`);
          return null;
        }

        return headers[columnNumber].textContent;
      }

      document.addEventListener("DOMContentLoaded", () => {
        const defaults = {
          settingsSource: "localStorage",
          topBarCenterText: "CALLSIGN - Locator",
          layout_cols: 4,
          layout_rows: 3,
          aURL: [["2196F3", "Photos", "https://picsum.photos/", 1, "L"]],
          aImages: [
            ["Tile 1", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 2", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 3", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 4", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 5", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 6", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 7", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 8", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 9", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 10", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 11", ["https://picsum.photos/seed/picsum/200/300"], 30000],
            ["Tile 12", ["https://picsum.photos/seed/picsum/200/300"], 30000],
          ],
          aRSS: [
            ["https://www.amsat.org/feed/", 60],           
            ["https://daily.hamweekly.com/atom.xml", 60],
            ["https://www.eham.net/rss/latest_news.php", 60],
            ["https://www.hamradio.com/rss.xml", 60],
            ["https://www.qrz.com/news.rss", 60],
          ],
        };

        settings = JSON.parse(localStorage.getItem("hamdash_config")) || {
          ...defaults,
        };

        if (settings.settingsSource) {
          document.querySelector(
            `input[name="settingsSource"][value="${settings.settingsSource}"]`
          ).checked = true;
        }

        adjustDashboardItems = () => {
          const totalItems = settings.layout_cols * settings.layout_rows;
          const currentItems = settings.aImages.length;

          if (currentItems < totalItems) {
            for (let i = currentItems; i < totalItems; i++) {
              settings.aImages.push(["", [""], 5000]);
            }
          } else if (currentItems > totalItems) {
            settings.aImages.splice(totalItems);
          }

          updateTable("dashboardTable", settings.aImages, [
            "Tile Title",
            "Tile URLs",
            "URL Rotation Interval (ms)",
          ]);
        };

        updateMenuTable = () => {
          updateTable("menuTable", settings.aURL, [
            "Color",
            "Text",
            "URL",
            "Scale",
            "Side",
          ]);
        };

        updateFeedTable = () => {
          updateTable("feedTable", settings.aRSS, [            
            "Feed URL",
            "Refresh Interval (minutes)",
          ]);
        };

        const updateTable = (tableId, data, columns) => {
          const tbody = document.querySelector(`#${tableId} tbody`);
          tbody.innerHTML = "";
          data.forEach((item, index) => {
            const row = document.createElement("tr");
            columns.forEach((col, colIndex) => {
              const cell = document.createElement("td");
              if (tableId == "menuTable" && colIndex==0){                        
                const colorInput = document.createElement("input");
                colorInput.type = "color";
                colorInput.value = "#"+item[colIndex].replace("#", "");
                colorInput.onchange = (e) => (item[colIndex] = e.target.value);
                cell.appendChild(colorInput);
              } else {
                if (Array.isArray(item[colIndex])) {
                  const container = document.createElement("div");
                  item[colIndex].forEach((url, urlIndex) => {
                    const textarea = document.createElement("input");
                    textarea.type =
                      getColumnHeaderTitle(tableId, colIndex) === ""
                        ? "number"
                        : "text";
                    textarea.value = url;
                    textarea.onchange = (e) =>
                      (item[colIndex][urlIndex] = e.target.value);
                    container.appendChild(textarea);
                    const removeBtn = document.createElement("button");
                    removeBtn.textContent = "Remove URL";
                    removeBtn.onclick = () => {
                      item[colIndex].splice(urlIndex, 1);
                      updateTable(tableId, data, columns);
                    };
                    container.appendChild(document.createElement("br"));
                    container.appendChild(removeBtn);
                    container.appendChild(document.createElement("br"));
                  });
                  const addBtn = document.createElement("button");
                  addBtn.textContent = "Add URL";
                  addBtn.onclick = () => {
                    item[colIndex].push("");
                    updateTable(tableId, data, columns);
                  };
                  container.appendChild(addBtn);
                  cell.appendChild(container);
                } else {
                  const input = document.createElement("input");
                  switch (getColumnHeaderTitle(tableId, colIndex)) {
                    case "Scale":
                      input.type = "number";
                      break;
                    case "URL Rotation Interval (ms)":
                      input.type = "number";
                      break;
                    default:
                      input.type = "text";
                  }
                  input.value = item[colIndex];
                  input.onchange = (e) =>
                    (item[colIndex] =
                      colIndex === 2
                        ? parseInt(e.target.value, 10)
                        : e.target.value);
                  cell.appendChild(input);
                }
              }
              row.appendChild(cell);
            });

            const actionsCell = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => {
              data.splice(index, 1);
              updateTable(tableId, data, columns);
              adjustDashboardItems();
            };
            actionsCell.appendChild(deleteBtn);
            row.appendChild(actionsCell);

            tbody.appendChild(row);
          });
        };

        document.getElementById("CenterText").value = settings.topBarCenterText;
        document.getElementById("layout_cols").value = settings.layout_cols;
        document.getElementById("layout_rows").value = settings.layout_rows;
        updateMenuTable();
        updateFeedTable();
        adjustDashboardItems();

        document.getElementById("saveConfig").onclick = () => {
          settings.settingsSource = document.querySelector(
            'input[name="settingsSource"]:checked'
          ).value;
          settings.topBarCenterText =
            document.getElementById("CenterText").value;
          settings.layout_cols = parseInt(
            document.getElementById("layout_cols").value,
            10
          );
          settings.layout_rows = parseInt(
            document.getElementById("layout_rows").value,
            10
          );

          const menuTableRows = document.querySelectorAll("#menuTable tbody tr");
          settings.aURL = Array.from(menuTableRows).map(row => {
            const cells = row.querySelectorAll("td");
            return [
              cells[0].querySelector("input").value,
              cells[1].querySelector("input").value,
              cells[2].querySelector("input").value,
              parseInt(cells[3].querySelector("input").value, 10),
              cells[4].querySelector("input").value
            ];
          });

          const feedTableRows = document.querySelectorAll("#feedTable tbody tr");
          settings.aRSS = Array.from(feedTableRows).map(row => {
            const cells = row.querySelectorAll("td");
            return [
              cells[0].querySelector("input").value,              
              parseInt(cells[1].querySelector("input").value, 10) 
            ];
          });
          
          localStorage.setItem("hamdash_config", JSON.stringify(settings));
          showToast("Settings saved!", "success");
          updateInputs();
          updateMenuTable();
          updateFeedTable();
          adjustDashboardItems();
        };

        document.getElementById("resetConfig").onclick = () => {
          localStorage.setItem("hamdash_config", JSON.stringify(defaults));
          showToast("Settings reset to defaults!", "success");
          settings = defaults;
          updateInputs();
          updateMenuTable();
          updateFeedTable();
          adjustDashboardItems();
        };

        document.getElementById("deleteConfig").onclick = () => {
          window.localStorage.removeItem('hamdash_config');
          showToast("Deleted local storage settings!", "info");
          updateInputs();
          updateMenuTable();
          updateFeedTable();
          adjustDashboardItems();
        };

        document.getElementById("backupConfig").onclick = () => {
          const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(settings));
          const downloadAnchorNode = document.createElement("a");
          downloadAnchorNode.setAttribute("href", dataStr);
          downloadAnchorNode.setAttribute(
            "download",
            "hamdash_config_backup.json"
          );
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        };

        document.getElementById("restoreConfig").onclick = () => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "application/json";
          input.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              settings = JSON.parse(e.target.result);
              showToast("Settings restored from backup!\nRemember to Save to make changes permanent.", "success", 5000);
              updateInputs();
              updateMenuTable();
              updateFeedTable();
              adjustDashboardItems();
            };
            reader.readAsText(file);
          };
          input.click();
        };

        document.getElementById("importConfig").onclick = () => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "application/json,.json";
          input.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const parsed = JSON.parse(e.target.result);
                // Validate expected shape
                if (typeof parsed !== "object" || parsed === null) throw new Error("Invalid config");
                const cfg = {
                  topBarCenterText: parsed.topBarCenterText || settings.topBarCenterText,
                  layout_cols: Number(parsed.layout_cols) || settings.layout_cols,
                  layout_rows: Number(parsed.layout_rows) || settings.layout_rows,
                  aURL: Array.isArray(parsed.aURL) ? parsed.aURL : settings.aURL,
                  aImages: Array.isArray(parsed.aImages) ? parsed.aImages : settings.aImages,
                  aRSS: Array.isArray(parsed.aRSS) ? parsed.aRSS : settings.aRSS,
                  settingsSource: "localStorage",
                };
                settings = cfg;
                showToast("Settings imported from JSON!\nRemember to Save to make changes permanent.", "success", 5000);
                updateInputs();
                updateMenuTable();
                updateFeedTable();
                adjustDashboardItems();
              } catch (err) {
                console.error("Import failed:", err);
                showToast("Import failed: " + err.message, "error", 5000);
              }
            };
            reader.readAsText(file);
          };
          input.click();
        };

        document.getElementById("exportConfig").onclick = () => {
          const configJSON = {
            topBarCenterText: settings.topBarCenterText,
            layout_cols: settings.layout_cols,
            layout_rows: settings.layout_rows,
            aURL: settings.aURL,
            aImages: settings.aImages,
            aRSS: settings.aRSS,
            settingsSource: "localStorage",
          };

          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configJSON, null, 2));
          const downloadAnchorNode = document.createElement("a");
          downloadAnchorNode.setAttribute("href", dataStr);
          downloadAnchorNode.setAttribute("download", "hamdash_config.json");
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        };

        document.getElementById("addMenuItem").onclick = () => {
          settings.aURL.push(["", "", "", "", ""]);
          updateMenuTable();
        };

        document.getElementById("addFeedItem").onclick = () => {
          settings.aRSS.push([""]);
          updateFeedTable();
        };

        document
          .getElementById("layout_cols")
          .addEventListener("change", () => {
            settings.layout_cols = parseInt(
              document.getElementById("layout_cols").value,
              10
            );
            adjustDashboardItems();
          });

        document
          .getElementById("layout_rows")
          .addEventListener("change", () => {
            settings.layout_rows = parseInt(
              document.getElementById("layout_rows").value,
              10
            );
            adjustDashboardItems();
          });

        function updateInputs() {
          if (settings.settingsSource) {
            document.querySelector(
              `input[name="settingsSource"][value="${settings.settingsSource}"]`
            ).checked = true;
          }
          document.getElementById("CenterText").value = settings.topBarCenterText;
          document.getElementById("layout_cols").value = settings.layout_cols;
          document.getElementById("layout_rows").value = settings.layout_rows;
        }

        function updateValue() {
          topBarCenterText = document.getElementById('CenterText').value;
          layout_cols = document.getElementById('layout_cols').value;
          layout_rows = document.getElementById('layout_rows').value;
          document.getElementById('topBarCenter').textContent = topBarCenterText;
          document.getElementById('layout_cols').textContent = layout_cols;
          document.getElementById('layout_rows').textContent = layout_rows;
        }
        document.getElementById('CenterText').onblur = updateValue;
        document.getElementById('layout_cols').onblur = updateValue;
        document.getElementById('layout_rows').onblur = updateValue;
       
      }); 
      
      function minimalConfiguration() {
        window.disableSetup = false;
        window.curSettingsSrc = "None";
        window.topBarCenterText = "Use 'Setup' to configure your Ham Radio Dashboard";
        window.layout_cols = 0;
        window.layout_rows = 0;
        window.aURL = [];
        window.aIMG = [];
        window.aRSS = [];
        window.tileDelay = [];
        start();
      }

      async function checkIfFileExists(url) {
        try {
          const response = await fetch(url, {
            method: "HEAD",
            mode: "no-cors",
          });
          return response.ok;
        } catch (error) {
          console.error("Error checking file:", error);
          return false;
        }
      }

      async function loadScriptIfExists(url) {
        const exists = await checkIfFileExists(url);
        if (exists) {
          return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        } else {
          console.log("File does not exist");
          minimalConfiguration();
          return Promise.reject("File does not exist");
        }
      }

      async function loadConfig() {
        const isFileProtocol = window.location.protocol === 'file:';
            if (isFileProtocol) {
              const script = document.createElement('script');
              script.src = 'config.js';
              script.onload = () => {
                console.log('config.js loaded successfully');
                window.curSettingsSrc = "config.js from file system";
                start();
              };
              script.onerror = (error) => {
                console.error('Failed to load config.js:', error);
                minimalConfiguration();
              };
              document.head.appendChild(script);
            } else {
              await loadScriptIfExists('config.js');
              console.log('config.js loaded successfully');
              window.curSettingsSrc = "config.js from server";
              start();
            }
      }

      async function main() {
        try {
          const settings = localStorage.getItem('hamdash_config');
          if (settings) {
            console.log('Settings found in localStorage');
            const parsedSettings = JSON.parse(settings);
            window.settingsSource = parsedSettings.settingsSource;
            if (settingsSource === 'localStorage') {
              console.log('Loading settings from localStorage');
              window.disableSetup = parsedSettings.disableSetup;
              window.topBarCenterText = parsedSettings.topBarCenterText;
              window.layout_cols = parsedSettings.layout_cols;
              window.layout_rows = parsedSettings.layout_rows;
              window.aURL = parsedSettings.aURL;
              window.aRSS = parsedSettings.aRSS;
              window.aIMG = parsedSettings.aImages;
              window.tileDelay = [];
              aIMG.forEach(subArray => {
                const lastElement = subArray.pop();
                tileDelay.push(lastElement);
              });

              aIMG.forEach(subArray => {
                if (Array.isArray(subArray[1])) {
                  subArray[1] = subArray[1].map(element => `${element}`).join(',');
                }
                const newElements = subArray[1].split(',');
                subArray.splice(1, 1, ...newElements);
              });
              window.curSettingsSrc = "Browser Local Storage";
              start();
            } else {
              console.log('Settings found in localStorage but loading from config.js file');
              loadConfig();
            }
          } else {
            console.log('No settings found in localStorage');
            loadConfig();
          }
        } catch (error) {
          console.error('Failed to load configuration:', error);
        }
      }

      var help = "Double click on an image to expand to full screen.\n";
      help += "Double click again to close full screen view.\n";
      help += "Right click (or long-press on mobile) on an image to display the next one.\n";
      help += "Images rotate every 60 seconds automatically by default.\n";
      help += "On mobile, use the hamburger buttons to open menus, pinch to zoom fullscreen images.";

      var rssTimers = [];
      var topBarTimer = null;

      const videoExtensions = [".mp4", ".webm", ".ogg", ".ogv"];

      function isVideo(src) {
        return videoExtensions.some((ext) => src.includes(ext));
      }

      function getVideoType(src) {
        if (src.includes(".mp4")) return "video/mp4";
        if (src.includes(".webm")) return "video/webm";
        if (src.includes(".ogg") || src.includes(".ogv")) return "video/ogg";
        return "";
      }

      function isFrame(src) {
        return src.includes("iframe|") || src.includes("iframedark|");
      }

      function isDarkFrame(src) {
        return src.includes("iframedark|");
      }

      function isDark(src) {
        return src.includes("dark|");
      }

      function isInvert(src) {
        return src.includes("invert|");
      }

      // Replace {{YYYYMMDD}} and {{DATE_ISO}} placeholders in config values
      function replaceDatePlaceholders(obj) {
        const now = new Date();
        const YYYYMMDD = now.toISOString().slice(0, 10).replace(/-/g, '');
        const DATE_ISO = now.toISOString().slice(0, 10);
        if (typeof obj === 'string') {
          return obj.replace(/{{YYYYMMDD}}/g, YYYYMMDD).replace(/{{DATE_ISO}}/g, DATE_ISO);
        } else if (Array.isArray(obj)) {
          return obj.map(replaceDatePlaceholders);
        } else if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(key => { obj[key] = replaceDatePlaceholders(obj[key]); });
          return obj;
        }
        return obj;
      }

      function oldformatArray(arr) {
        return arr.join("<br>");
      }

      function formatArray(arr) {
        return arr
          .map((innerArray) =>
            innerArray
              .map((item) => (typeof item === "string" ? `"${item}"` : item))
              .join(", ")
          )
          .join("<br>");
      }

      function setRot() {
        if (typeof tileDelay === "undefined") {
          aInt[0] = setInterval(() => slide(), 30000);
        } else {
          tileDelay.forEach(function (tile, i) {
            if (tile > 0) {
              aInt[i] = setInterval(() => slide(i), tile);
            }
          });
        }
      }

      function rotStop() {
        if (typeof tileDelay === "undefined") {
          clearTimeout(aInt[0]);
        } else {
          tileDelay.forEach(function (tile, i) {
            clearTimeout(aInt[i]);
          });
        }
      }

      function MenuOpt(num) {
        window.stop();
        rotStop();
        if (aURL[num][1].toLowerCase() == "refresh") {
          location.reload();
          setRot();
        } else if (aURL[num][1].toLowerCase() == "help") {
          showToast(help, "info", 8000);
        } else if (aURL[num][1].toLowerCase() == "setup") {
          document.getElementById("FullScreen").style.display = "none";
          document.getElementById("fixedSection").style.display = "block";
          document.getElementById("settingsPage").style.display = "block";
          document.getElementById("iFrameContainer").style.zIndex = 1;
          document.getElementById("iFrameContainer").style.backgroundColor = "black";
          if (curSettingsSrc === "local") {
            document.querySelector(`input[name="settingsSource"][value="localStorage"]`).checked = true;
          } else if (curSettingsSrc.includes("config.js")) {
            document.querySelector(`input[name="settingsSource"][value="file"]`).checked = true;
          }
          window.settings.topBarCenterText = topBarCenterText;
          window.settings.layout_cols = window.layout_cols;
          window.settings.layout_rows = window.layout_rows;
          document.getElementById("CenterText").value = window.settings.topBarCenterText;
          document.getElementById("layout_cols").value = window.settings.layout_cols;
          document.getElementById("layout_rows").value = window.settings.layout_rows;
          filteredAURL = aURL.filter(
                (item) =>
                  !item.some(
                    (subItem) =>
                      typeof subItem === "string" &&
                      (subItem.includes("BACK") ||
                        subItem.includes("Back") ||
                        subItem.includes("Refresh") ||
                        subItem.includes("Setup") ||
                        subItem.includes("Help"))
                  )
              );
          window.settings.aURL = filteredAURL;
          window.settings.aImages = aIMG.map((item, index) => {
                  const [first, ...rest] = item;
                  return [first, rest, tileDelay[index]];
                });
          window.settings.aRSS = aRSS;          
          updateMenuTable();
          updateFeedTable();
          adjustDashboardItems();
        } else if (aURL[num][1].toLowerCase() == "back"){
          document.getElementById("FullScreen").src = "about:blank";
          document.getElementById("iFrameContainer").style.zIndex = -2;
          document.getElementById("iFrameContainer").style.backgroundColor = "black";
          document.getElementById("FullScreen").style.display = "none";
          document.getElementById("settingsPage").style.display = "none";
          setRot();
        } else {
          document.getElementById("iFrameContainer").style.zIndex = 1;
          document.getElementById("FullScreen").style.display = "block";
          var src = aURL[num][2];
          if (isDark(src)) {
            document.getElementById("FullScreen").style.filter = "invert(1) hue-rotate(180deg)";
            src = src.replace("dark|", "");
          } else {
            document.getElementById("FullScreen").style.filter = "none";
          }
          document.getElementById("FullScreen").src = src;
          document.getElementById("FullScreen").style.transform = "scale(" + aURL[num][3] + ")";
        }
      }

      function hideOverlay() {
        document.getElementById("overlay").style.display = "none";
      }

      function larger(event) {
        var targetElement = event.target || event.srcElement;
        if (largeShow == 1) {
          setRot();
          //
          largeShow = 0;
          document.getElementById("imgZoom").style.display = "none";
          document.getElementById("imgZoom").style.zIndex = -2;
          const closeBtn = document.getElementById("imgZoomClose");
          if (closeBtn) closeBtn.classList.remove("show");
        } else {
          window.stop();
          rotStop();
          //
          largeShow = 1;
          // Extract index robustly (handles ClickOverlayN or ImageN)
          const idMatch = targetElement.id && targetElement.id.match(/\d+/);
          if (!idMatch) {
            console.warn("Could not find index for zoom", targetElement.id);
            return;
          }
          largeIdx = +idMatch[0];
          document.getElementById("imgZoom").style.display = "block";
          document.getElementById("imgZoom").style.zIndex = 3;
          // Find the source from the actual tile image
          const sourceImg = document.getElementById("Image" + largeIdx);
          if (sourceImg) {
            // If wheelzoom is active, sourceImg.src is a transparent placeholder.
            // The real image is in style.backgroundImage
            let realSrc = sourceImg.src;
            if (sourceImg.style.backgroundImage) {
              realSrc = sourceImg.style.backgroundImage
                .replace(/^url\(["']?/, "")
                .replace(/["']?\)$/, "");
            }
            document.getElementById("ImageLarge").src = realSrc;
          }
          const closeBtn = document.getElementById("imgZoomClose");
          if (closeBtn) closeBtn.classList.add("show");
        }
      }

      // Single-click on a tile also opens fullscreen (more discoverable than dblclick)
      function singleClickFullscreen(event) {
        const img = event.target;
        if (!img || !img.id || !img.id.startsWith("Image")) return;
        if (largeShow == 1) return; // already open
        larger({ target: img });
      }

      function getImgURL(url) {
        return url.includes("?") ? url : url + "?_=" + Date.now();
      }

      function rotate(event) {
        event.preventDefault();
        var targetElement = event.target || event.srcElement;
        if (largeShow == 1) {
          i = largeIdx;
        } else {
          // Extract index robustly (handles ClickOverlayN or ImageN)
          const idMatch = targetElement.id && targetElement.id.match(/\d+/);
          if (!idMatch) return;
          i = +idMatch[0];
        }
        imgRot(i);
      }

      function imgRot(i) {
        if (aIMG[i].length > 2) {
          ++aIdx[i];
          if (aIdx[i] > aIMG[i].length - 1) {
            aIdx[i] = 1;
          }
        }
        // Clear any previous error placeholder for this tile
        const errEl = document.getElementById(`Err${i}`);
        if (errEl) errEl.remove();
        const badge = document.getElementById(`Badge${i}`);
        if (badge) badge.classList.remove("loaded", "error");

        // Rotating title logic: if first element is an array, update title to match
        const titleDiv = document.getElementById("Title" + i);
        if (titleDiv && Array.isArray(aIMG[i][0])) {
          titleDiv.textContent = aIMG[i][0][aIdx[i] - 1] || "";
        }

        // Click overlay visibility: show for video/iframe, hide for images
        const overlay = document.getElementById("ClickOverlay" + i);
        if (overlay) {
          if (isVideo(aIMG[i][aIdx[i]]) || isFrame(aIMG[i][aIdx[i]])) {
            overlay.style.display = "block";
          } else {
            overlay.style.display = "none";
          }
        }

        vid = document.getElementById("Video" + i);
        img = document.getElementById("Image" + i);
        ifr = document.getElementById("iFrame" + i);
        if (isVideo(aIMG[i][aIdx[i]])) {
          // Is video
          vid.src = getImgURL(aIMG[i][aIdx[i]]);
          vid.classList.remove("hidden");
          // Hide others
          img.classList.add("hidden");
          ifr.classList.add("hidden");
        } else if (isFrame(aIMG[i][aIdx[i]])) {
          // Is iFrame (supports iframedark| for dark-inverted iframes)
          var src = aIMG[i][aIdx[i]];
          if (isDarkFrame(src)) {
            newSrc = src.split("iframedark|");
            ifr.style.filter = "invert(1) hue-rotate(180deg)";
          } else {
            newSrc = src.split("iframe|");
            ifr.style.filter = "none";
          }
          ifr.classList.remove("hidden");
          // Handle optional scale parameter: prefix|URL|SCALE
          var content = newSrc[1];
          var contentParts = content.split("|");
          ifr.src = contentParts[0];
          if (contentParts[1]) ifr.style.transform = "scale(" + contentParts[1] + ")";
          ifr.style.zIndex = 0;
          // Hide others
          vid.classList.add("hidden");
          img.classList.add("hidden");
        } else {
          // Is image (supports invert| for dark-inverted images)
          var src = aIMG[i][aIdx[i]];
          if (isInvert(src)) {
            img.style.filter = "invert(1)";
            src = src.replace("invert|", "");
          } else {
            img.style.filter = "none";
          }
          img.src = getImgURL(src);
          img.classList.remove("hidden");
          // Hide others
          vid.classList.add("hidden");
          ifr.classList.add("hidden");
        }
        // Preload the NEXT image in this tile's rotation so the next
        // switch is instant instead of showing a black flash.
        if (aIMG[i].length > 2) {
          let nextIdx = aIdx[i] + 1;
          if (nextIdx > aIMG[i].length - 1) nextIdx = 1;
          const nextSrc = aIMG[i][nextIdx];
          if (nextSrc && !isVideo(nextSrc) && !isFrame(nextSrc)) {
            const preloader = new Image();
            let preloadUrl = nextSrc;
            if (isInvert(preloadUrl)) preloadUrl = preloadUrl.replace("invert|", "");
            preloader.src = getImgURL(preloadUrl);
          }
        }
        // Full-screen rotation support: update zoomed image if this tile is zoomed
        if (largeShow == 1 && i == largeIdx) {
          const largeImg = document.getElementById("ImageLarge");
          if (largeImg) {
            const isImg = !isVideo(aIMG[i][aIdx[i]]) && !isFrame(aIMG[i][aIdx[i]]);
            if (isImg) {
              let zoomSrc = aIMG[i][aIdx[i]];
              if (isInvert(zoomSrc)) zoomSrc = zoomSrc.replace("invert|", "");
              largeImg.src = getImgURL(zoomSrc);
            } else {
              // Rotating into non-image content: close zoom view
              larger({ target: document.getElementById("Image" + i) });
            }
          }
        }
      }

      // Automatically rotate images
      function slide(i) {
        // check all tiles or one tile
        if (typeof i === "undefined") {
          // get the locations with multiple images
          aIMG.forEach(function (innerArray, i) {
            imgRot(i);
          });
        } else {
          // Only one tile as per timeout call
          imgRot(i);
        }
      }

      function updateTickerSpeed() {
        const rssTickerContent = document.querySelector(".rss-ticker-content");
        if (rssTickerContent) {
          // Calculate the width of the content and the container
          const contentWidth = rssTickerContent.scrollWidth;
          const containerWidth = rssTickerContent.parentElement.offsetWidth;
        
          // Define a base speed (e.g., 180px per second)
          const baseSpeed = 180; // pixels per second
        
          // Calculate the duration based on the content width
          const duration = (contentWidth + containerWidth) / baseSpeed;
        
          // Update the CSS variable for the animation duration
          rssTickerContent.style.setProperty("--ticker-duration", `${duration}s`);
          // console.log(`Updated ticker speed: ${duration}s`);
        }
      }

      // Store interval IDs and active fetches to prevent duplicates
      let rssIntervals = [];
      let activeFetches = new Map();

      // Function to fetch and display the RSS feed
      function fetchAndDisplayRss() {
        // Clear any existing intervals first
        rssIntervals.forEach(clearInterval);
        rssIntervals = [];

        // rss2json returns JSON (most reliable); allorigins returns raw XML
        const proxyList = [
          (url) => "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(url),
          (url) => "https://api.allorigins.win/raw?url=" + encodeURIComponent(url),
        ];
        const rssTickerContent = document.getElementById("rss-ticker-content");

        // Array to store the content of each feed
        const feedContents = new Array(aRSS.length).fill("");

        console.log("Fetching RSS feeds...");

        function fetchWithFallback(url, attempt = 0) {
          if (attempt >= proxyList.length) {
            return Promise.reject(new Error("All proxies failed for " + url));
          }
          // Use AbortController with 10s timeout per attempt
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);
          return fetch(proxyList[attempt](url), { signal: controller.signal, cache: 'no-cache' })
            .then((response) => {
              clearTimeout(timeoutId);
              if (!response.ok) throw new Error("HTTP " + response.status);
              return response.text();
            })
            .catch((err) => {
              clearTimeout(timeoutId);
              console.warn(`Proxy ${attempt} failed for ${url}:`, err.message);
              return fetchWithFallback(url, attempt + 1);
            });
        }

        // Parse JSON response from rss2json API
        function parseJsonFeed(data, rssUrl) {
          const obj = JSON.parse(data);
          if (obj.status !== 'ok' || !obj.items) {
            throw new Error(obj.message || 'rss2json returned error status');
          }
          const feedTitle = obj.feed?.title || "Unknown Feed";
          const lastUpdated = obj.items?.[0]?.pubDate || "Unknown Time";
          const items = obj.items;
          console.log(`Found ${items.length} items in feed: ${rssUrl}`);
          let feedText = `<span style="font-size: 0.9em; color: var(--text-muted);"> ${feedTitle} - Last Updated: ${lastUpdated} </span> - `;
          items.forEach((item) => {
            const title = item.title || "No title";
            const link = item.link || "#";
            feedText += `<a href="${link}" target="_blank" rel="noopener" style="margin-right: 50px;">${title}</a>`;
          });
          return feedText;
        }

        // Parse XML response from allorigins (raw RSS/Atom)
        function parseXmlFeed(data, rssUrl) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, "text/xml");
          // Check for parse error
          if (xmlDoc.querySelector("parsererror")) {
            throw new Error("XML parse error");
          }
          let itmTag = "item";
          if (xmlDoc.querySelector("entry")) itmTag = "entry";
          const feedTitle = xmlDoc.querySelector("channel > title, feed > title")?.textContent || "Unknown Feed";
          const lastUpdated = xmlDoc.querySelector("channel > lastBuildDate, feed > updated")?.textContent ||
                              xmlDoc.querySelector("channel > pubDate, feed > published")?.textContent || "Unknown Time";
          const items = xmlDoc.querySelectorAll(itmTag);
          console.log(`Found ${items.length} items in feed: ${rssUrl}`);
          let feedText = `<span style="font-size: 0.9em; color: var(--text-muted);"> ${feedTitle} - Last Updated: ${lastUpdated} </span> - `;
          items.forEach((item) => {
            const title = item.querySelector("title")?.textContent || "No title";
            const linkElement = item.querySelector("link");
            let link = "";
            if (linkElement) {
              if (linkElement.getAttribute("href")) {
                link = linkElement.getAttribute("href");
              } else {
                link = linkElement.textContent;
              }
            }
            feedText += `<a href="${link}" target="_blank" rel="noopener" style="margin-right: 50px;">${title}</a>`;
          });
          return feedText;
        }

        aRSS.forEach(([rssUrl, interval], index) => {
          const fetchFeed = () => {
            // Prevent duplicate concurrent fetches for the same URL
            if (activeFetches.has(rssUrl)) {
              console.log(`Fetch already in progress for ${rssUrl}, skipping...`);
              return Promise.resolve();
            }
            console.log(`Fetching feed: ${rssUrl}`);
            const fetchPromise = fetchWithFallback(rssUrl)
              .then((data) => {
                // Detect JSON vs XML response and parse accordingly
                let feedText;
                const trimmed = data.trimStart();
                if (trimmed.startsWith('{')) {
                  // JSON response from rss2json
                  feedText = parseJsonFeed(data, rssUrl);
                } else {
                  // XML response from allorigins
                  feedText = parseXmlFeed(data, rssUrl);
                }
                feedContents[index] = feedText;
                rssTickerContent.innerHTML = feedContents.join("") || "Failed to load RSS feeds.";
                updateTickerSpeed();
              })
              .catch((error) => {
                if (!error.message.includes('aborted') && !error.message.includes('Failed to fetch')) {
                  console.error(`Error fetching RSS feed from ${rssUrl}:`, error);
                }
                const domain = rssUrl.split('/')[2] || rssUrl;
                feedContents[index] = `<span style="color: var(--danger); margin-right: 50px;"> ${domain} unavailable </span>`;
                rssTickerContent.innerHTML = feedContents.join("");
              })
              .finally(() => {
                activeFetches.delete(rssUrl);
              });

            activeFetches.set(rssUrl, fetchPromise);
            return fetchPromise;
          };

          fetchFeed();

          if (interval && interval > 0) {
            const intervalId = setInterval(() => {
              fetchFeed().catch(err => console.error(`Failed to refresh feed ${rssUrl}:`, err));
            }, interval * 60 * 1000);
            rssIntervals.push(intervalId);
          }
        });
      }

      function start() {
        // Replace date placeholders in all config arrays
        aURL = replaceDatePlaceholders(aURL);
        aIMG = replaceDatePlaceholders(aIMG);
        aRSS = replaceDatePlaceholders(aRSS);

        var layout_cols = typeof window.layout_cols === "undefined" ? 4 : window.layout_cols;
        var layout_rows = typeof window.layout_rows === "undefined" ? 3 : window.layout_rows;
        // On small screens, force fewer columns for usability
        var screenWidth = window.innerWidth;
        if (screenWidth <= 640) {
          layout_cols = 1;
        } else if (screenWidth <= 1024) {
          layout_cols = Math.min(layout_cols, 2);
        }
        var layout_grid = "auto ".repeat(layout_cols);
        var layout_width = 99.6 / layout_cols + "vw";
        // Reserve space for top bar (~47px), solar widget (~30px), RSS
        // ticker (~27px), dashboard margins (12px), dashboard bottom padding (32px),
        // and grid gaps between rows ((rows-1)*6px). Total fixed overhead ~148px.
        var overhead = 148 + (layout_rows - 1) * 6;
        var layout_height = "calc((100vh - " + overhead + "px) / " + layout_rows + ")";
        var iTiles = layout_cols * layout_rows;
        document.documentElement.style.setProperty(
          "--main-layout",
          layout_grid
        );
        document.documentElement.style.setProperty(
          "--main-width",
          layout_width
        );
        document.documentElement.style.setProperty(
          "--main-height",
          layout_height
        );

        document.getElementById("currentSettingsSource").innerHTML = curSettingsSrc;

        window.largeShow = 0;
        window.aIdx = [];
        window.aInt = [];
        for (var i = 1; i <= iTiles; i++) {
          aIdx.push(1);
          aInt.push(null);
        }
        if (!(aIMG.length == tileDelay.length && aIMG.length == iTiles)) {
          var msg = "Error detected on config.js file!\n";
          msg += "The number of tile sources (" + aIMG.length + " in aIMG) and\n";
          msg += "the tile delay (" + tileDelay.length + " in tileDelay) arrays should match\n";
          msg += "the number of items each one contains and\n";
          msg += "the number of tiles used on the layout specified (" + iTiles + ").";
          showToast(msg, "error", 8000);
        }

        var parentDiv = document.getElementById("myMenu");
        var parentDivR = document.getElementById("myMenuR");

        aURL.unshift(
          ["add10d", "BACK", "", "1", "L"],
          ["add10d", "BACK", "", "1", "R"],
          ["ff9100", "Refresh", "?_=" + Date.now(), "1"],
          ["0dd1a7", "Help", "#", "1", "L"]
        );

        if (typeof disableSetup === "undefined" || !disableSetup) {
          aURL.push(
            ["ff9100", "Setup", "#", "1", "R"]
        )
        }

        // Append the new div to the parent div
        aURL.forEach(function (innerArray, index) {
          // Create a new div element
          var newDiv = document.createElement("div");
          var color = innerArray[0].replace("#", "");
          // Normalize colors that are too dark to see on the dark theme background
          if (color === "000000" || color === "000") {
            color = "30363d"; // visible dark gray
          }
          // Determine menu item type for icon prefix
          const title = String(innerArray[1] || "").trim();
          const link = String(innerArray[2] || "").trim();
          const titleLower = title.toLowerCase();
          const linkLower = link.toLowerCase();
          const coreNames = ["back", "refresh", "help", "setup"];
          let menuType = "user";
          let icon = "";
          if (coreNames.includes(titleLower)) {
            menuType = "core";
            icon = "\u2605 "; // ★
          } else if (titleLower.endsWith(".js") || titleLower.endsWith(".json") ||
                     linkLower.endsWith(".js") || linkLower.endsWith(".json")) {
            menuType = "config";
            icon = "\u2699 "; // ⚙
          }
          // Build the link safely (textContent prevents HTML injection from config)
          var linkEl = document.createElement("a");
          linkEl.href = "#";
          linkEl.className = "menu-link menu-" + menuType;
          linkEl.style.backgroundColor = "#" + color;
          linkEl.textContent = icon + title;
          linkEl.onclick = (function(idx) { return function() { MenuOpt(idx); }; })(index);
          newDiv.appendChild(linkEl);
          if (innerArray[4] == "R") {
            // Set some properties for the new div
            newDiv.id = "mySidenavR";
            newDiv.className = "sidenavR";
            parentDivR.appendChild(newDiv);
          } else {
            // Set some properties for the new div
            newDiv.id = "mySidenav";
            newDiv.className = "sidenav";
            parentDiv.appendChild(newDiv);
          }
        });

        // Get the parent div for Dashboard container
        var parentDiv = document.getElementById("dash");

        // Append the new div to the parent div
        aIMG.forEach(function (innerArray, index) {
          // Create a new div element
          var newDiv = document.createElement("div");
          newDiv.className = "image-container";
          newDiv.id = `box${index}`;

          // Loading spinner (shown until media loads)
          const spinner = document.createElement("div");
          spinner.className = "tile-spinner";
          spinner.id = `Spinner${index}`;
          // Status badge (amber=loading, green=loaded, red=error)
          const badge = document.createElement("div");
          badge.className = "tile-badge";
          badge.id = `Badge${index}`;
          function setBadge(state) {
            badge.classList.remove("loaded", "error");
            if (state) badge.classList.add(state);
          }
          function hideSpinner() {
            const s = document.getElementById(`Spinner${index}`);
            if (s) s.remove();
            setBadge("loaded");
          }
          function showTileError(text) {
            hideSpinner();
            setBadge("error");
            if (document.getElementById(`Err${index}`)) return;
            const err = document.createElement("div");
            err.className = "tile-error";
            err.id = `Err${index}`;
            err.textContent = text;
            newDiv.appendChild(err);
          }

          // Add video placeholder containers
          const video = document.createElement("video");
          video.id = `Video${index}`;
          video.classList.add("media", "hidden");
          video.controls = true;
          video.muted = true;
          video.autoplay = true;
          video.loop = true;
          const source = document.createElement("source");

          // Create a new img element
          var newImg = document.createElement("img");
          newImg.id = `Image${index}`;
          newImg.classList.add("hidden");
          newImg.oncontextmenu = rotate;
          newImg.ondblclick = larger;
          newImg.onload = hideSpinner;
          // Single-click also opens fullscreen (more discoverable than dblclick)
          newImg.addEventListener("click", singleClickFullscreen);

          // append newIframes iFrameNN
          var newFrame = document.createElement("iframe");
          newFrame.className = "iframe-tile";
          newFrame.id = `iFrame${index}`;
          newFrame.classList.add("hidden");
          newFrame.setAttribute("referrerpolicy", "no-referrer");
          newFrame.setAttribute("loading", "lazy");
          // Sandbox: restrict what embedded third-party sites can do.
          // allow-scripts + allow-same-origin so they render; allow-popups for
          // any in-site links; allow-forms for interactive tools. Forms/popups
          // can be dropped per-source if a site misbehaves.
          newFrame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups allow-forms");

          // Click overlay for video/iframe tiles: captures right-click for rotation
          // and double-click to "unlock" interaction with embedded content
          var clickOverlay = document.createElement("div");
          clickOverlay.className = "click-overlay";
          clickOverlay.id = `ClickOverlay${index}`;
          clickOverlay.oncontextmenu = rotate;
          clickOverlay.ondblclick = function (event) {
            const currentItem = aIMG[index][aIdx[index]];
            if (isVideo(currentItem) || isFrame(currentItem)) {
              // Unlock tile for direct interaction
              this.style.display = "none";
            } else {
              // Image: trigger standard zoom
              larger(event);
            }
          };

          var newSrc = " ";

          if (isVideo(innerArray[1])) {
            // Is a video
            video.classList.remove("hidden");
            source.src = innerArray[1];
            source.type = getVideoType(innerArray[1]);
            video.appendChild(source);
            hideSpinner();
            clickOverlay.style.display = "block";
          } else if (isFrame(innerArray[1])) {
            // Is iFrame (supports iframedark| for dark-inverted iframes)
            newFrame.classList.remove("hidden");
            var src = innerArray[1];
            if (isDarkFrame(src)) {
              newSrc = src.split("iframedark|");
              newFrame.style.filter = "invert(1) hue-rotate(180deg)";
            } else {
              newSrc = src.split("iframe|");
              newFrame.style.filter = "none";
            }
            var content = newSrc[1];
            var contentParts = content.split("|");
            newFrame.src = contentParts[0];
            if (contentParts[1]) newFrame.style.transform = "scale(" + contentParts[1] + ")";
            newFrame.style.zIndex = 0;
            newFrame.addEventListener("load", hideSpinner);
            // Iframes that fail due to X-Frame-Options/CSP don't fire error
            // events reliably, so use a timeout fallback to show a placeholder.
            const frameTimeout = setTimeout(() => {
              if (document.getElementById(`Spinner${index}`)) {
                showTileError("Source blocked from embedding. Open via menu.");
              }
            }, 12000);
            newFrame.addEventListener("load", () => clearTimeout(frameTimeout));
            clickOverlay.style.display = "block";
          } else {
            // Is an image (supports invert| for dark-inverted images)
            newImg.classList.remove("hidden");
            var src = innerArray[1];
            if (isInvert(src)) {
              newImg.style.filter = "invert(1)";
              src = src.replace("invert|", "");
            } else {
              newImg.style.filter = "none";
            }
            newImg.src = getImgURL(src);
            newImg.onerror = function () {
              text = "Failed to load image";
              console.log(text, this.src);
              if (this.src.includes("?")) {
                // Retry without passing variables first to see if fixes the error
                console.log("Trying without caching prevention");
                newImg.src = this.src.split("?")[0];
              } else {
                hideSpinner();
                showTileError(text);
              }
            };
            clickOverlay.style.display = "none";
          }

          // append newDivs boxNN
          newDiv.appendChild(spinner);
          newDiv.appendChild(badge);
          newDiv.appendChild(video);
          newDiv.appendChild(newImg);
          newDiv.appendChild(newFrame);
          newDiv.appendChild(clickOverlay);
          parentDiv.appendChild(newDiv);

          // Create a new div element for img title
          // Supports rotating titles: first element can be an array of titles
          let initialTitle = "";
          if (Array.isArray(innerArray[0])) {
            initialTitle = innerArray[0][0] || "";
          } else {
            initialTitle = innerArray[0];
          }
          if (initialTitle.length > 0 || Array.isArray(innerArray[0])) {
            var newTtl = document.createElement("div");
            newTtl.className = "image-title";
            newTtl.id = `Title${index}`;
            newTtl.textContent = initialTitle;
            newDiv.appendChild(newTtl);
          }
        });

        // assign wheelzoom functionality to all 12 images
        wheelzoom(document.querySelectorAll("img"));

        // Touch gestures: long-press to rotate tiles, pinch-zoom fullscreen image
        document.querySelectorAll('.image-container img').forEach(img => attachLongPressRotate(img));
        const largeImg = document.getElementById('ImageLarge');
        if (largeImg) attachPinchZoom(largeImg);

        // Hamburger menu toggle buttons (mobile)
        setupMenuToggles();

        // Debounced resize: avoid reloading on mobile URL-bar show/hide.
        // Only reload on actual orientation changes or significant width changes.
        let resizeTimer = null;
        let lastWidth = window.innerWidth;
        window.addEventListener("resize", function () {
          "use strict";
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            const newWidth = window.innerWidth;
            const orientationChanged = window.screen && window.screen.orientation &&
              (window.screen.orientation.type || "").includes('portrait') !==
              (Math.abs(window.orientation) !== 90);
            const widthChanged = Math.abs(newWidth - lastWidth) > 80;
            if (orientationChanged || widthChanged) {
              lastWidth = newWidth;
              window.location.reload();
            } else {
              lastWidth = newWidth;
            }
          }, 300);
        });
        window.addEventListener("orientationchange", function () {
          setTimeout(() => window.location.reload(), 300);
        });

        if (typeof aRSS !== "undefined" && aRSS.length > 0) {
          // Dynamically create the RSS ticker div
          const rssTicker = document.createElement("div");
          rssTicker.id = "rss-ticker";
          rssTicker.className = "rss-ticker";
                
          const rssTickerContent = document.createElement("div");
          rssTickerContent.id = "rss-ticker-content";
          rssTickerContent.className = "rss-ticker-content";
                
          rssTicker.appendChild(rssTickerContent);
          document.body.appendChild(rssTicker); // Add the ticker to the body
                
          // Call the function to fetch and display RSS feeds
          fetchAndDisplayRss();

          // Add event listeners for pause and resume functionality
          rssTickerContent.addEventListener("mouseenter", () => {            
            rssTickerContent.style.animationPlayState = "paused";
          });
        
          rssTickerContent.addEventListener("mouseleave", () => {            
            rssTickerContent.style.animationPlayState = "running";
          });
        }

        setRot();

        // Start the solar conditions widget
        fetchSolarConditions();
        solarTimer = setInterval(fetchSolarConditions, 5 * 60 * 1000); // refresh every 5 min

        // Wire up the fullscreen close button + Esc key
        const zoomClose = document.getElementById("imgZoomClose");
        if (zoomClose) {
          zoomClose.addEventListener("click", () => {
            if (largeShow == 1) larger({ target: document.getElementById("Image" + largeIdx) });
          });
        }
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && largeShow == 1) {
            larger({ target: document.getElementById("Image" + largeIdx) });
          }
        });
      }

      /* ===== Solar conditions widget (NOAA SWPC JSON API) ===== */
      var solarTimer = null;
      async function fetchSolarConditions() {
        const widget = document.getElementById("solarWidget");
        const statusEl = document.getElementById("solarStatus");
        const detailEl = document.getElementById("solarDetail");
        if (!widget || !statusEl || !detailEl) return;

        const endpoints = {
          flux: "https://services.swpc.noaa.gov/products/summary/10cm-flux.json",
          kp:   "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json",
          wind: "https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json",
          xray: "https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json",
        };

        async function getJSON(url) {
          try {
            const r = await fetch(url);
            if (!r.ok) return null;
            return await r.json();
          } catch { return null; }
        }

        const [fluxData, kpData, windData, xrayData] = await Promise.all([
          getJSON(endpoints.flux),
          getJSON(endpoints.kp),
          getJSON(endpoints.wind),
          getJSON(endpoints.xray),
        ]);

        // Solar Flux Index (10.7cm)
        let sfi = null;
        if (Array.isArray(fluxData) && fluxData.length) {
          sfi = Number(fluxData[fluxData.length - 1].flux);
        }

        // Latest Kp index (last entry in the array)
        let kp = null;
        if (Array.isArray(kpData) && kpData.length) {
          kp = Number(kpData[kpData.length - 1].Kp);
        }

        // Solar wind speed (km/s)
        let wind = null;
        if (Array.isArray(windData) && windData.length) {
          wind = Number(windData[windData.length - 1].proton_speed);
        }

        // X-ray flux class (last long-band entry)
        let xrayClass = "—";
        if (Array.isArray(xrayData) && xrayData.length) {
          // Long band is 0.1-0.8nm; entries are ordered newest-first typically
          const longBand = xrayData.filter(e => e.energy === "0.1-0.8nm");
          if (longBand.length) {
            const flux = Number(longBand[0].flux);
            xrayClass = xrayFluxClass(flux);
          }
        }

        // Determine band verdict from SFI + Kp
        let verdict = "—", verdictClass = "fair";
        if (sfi !== null && kp !== null) {
          if (sfi >= 120 && kp <= 3) { verdict = "Bands OPEN"; verdictClass = "good"; }
          else if (sfi >= 90 && kp <= 4) { verdict = "Bands FAIR"; verdictClass = "fair"; }
          else { verdict = "Bands POOR"; verdictClass = "poor"; }
        }

        statusEl.textContent = "Solar: " + verdict;
        statusEl.className = "solar-status " + verdictClass;
        detailEl.innerHTML =
          `SFI <b>${sfi !== null ? sfi : "—"}</b> · ` +
          `Kp <b>${kp !== null ? kp.toFixed(1) : "—"}</b> · ` +
          `Wind <b>${wind !== null ? wind + " km/s" : "—"}</b> · ` +
          `X-ray <b>${xrayClass}</b>`;
        widget.hidden = false;
      }

      // Convert X-ray flux (W/m²) to flare class label
      function xrayFluxClass(flux) {
        if (flux >= 1e-4) return "X";
        if (flux >= 1e-5) return "M";
        if (flux >= 1e-6) return "C";
        if (flux >= 1e-7) return "B";
        if (flux >= 1e-8) return "A";
        return "—";
      }

      // This function update the time on the top bar
      function updateTopBar() {
        const now = new Date();
        const localDate = now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        });
        const localTime = now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        });

        const utcDate = now.toISOString().slice(0, 10);
        const utcTime = now.toISOString().slice(11, 19) + " UTC";

        const topBarLeft = document.getElementById("topBarLeft");
        topBarLeft.textContent = `${localDate} - ${localTime}`;
        const topBarCenter = document.getElementById("topBarCenter");
        topBarCenter.textContent = topBarCenterText;
        const topBarRight = document.getElementById("topBarRight");
        topBarRight.textContent = `${utcDate} ${utcTime}`;
      }

      // Update every second
      topBarTimer = setInterval(updateTopBar, 1000);

      // Pause heavy work when the tab is hidden; resume when visible
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          if (topBarTimer) { clearInterval(topBarTimer); topBarTimer = null; }
          if (solarTimer) { clearInterval(solarTimer); solarTimer = null; }
          rssIntervals.forEach(clearInterval);
        } else {
          if (!topBarTimer) { topBarTimer = setInterval(updateTopBar, 1000); updateTopBar(); }
          if (!solarTimer) { fetchSolarConditions(); solarTimer = setInterval(fetchSolarConditions, 5 * 60 * 1000); }
        }
      });
