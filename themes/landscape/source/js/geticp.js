window.onload = function () {
  var host = window.location.host.split(":")[0];
  if (!isIP(host)) {
    getIcpNum(host);
  }
};

function isIP(host) {
  var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/; //正则表达式
  if (re.test(host)) {
    if (
      RegExp.$1 < 256 &&
      RegExp.$2 < 256 &&
      RegExp.$3 < 256 &&
      RegExp.$4 < 256
    )
      return true;
  }
  return false;
}

var icp = document.getElementById("icp");
function getIcpNum(host) {
  var segs = host.split(".");
  if (segs.length > 1) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var data = JSON.parse(this.responseText);
      if (data.code === "200") {
        icp.innerText = data["网站备案/许可证号"];
		document.title = data["网站名称"]
		document.getElementById("logo").innerText = data["网站名称"]
      } else {
        segs.splice(0, 1);
        getIcpNum(segs.join("."));
      }
    };
    xhttp.open("GET", `https://api.oick.cn/icp/api.php?url=${host}`, true);
    xhttp.send();
  }
}