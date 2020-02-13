var version = "common version: 1.7.8";
var changelog = [
  "common更新日志",
  "1.6.3 enginesAll前面加var",
  "1.6.4 一气化三清",
  "1.6.5 增加sleep8",
  "1.6.6 stopOtherScript增加mainThread",
  "1.6.7 mainThreadToString不可以是undefined",
  "1.6.8 增加deleteAllFile",
  "1.6.9 getMinMaxTime错误返回false",
  "1.7.0 一气化三清一秒以后删掉文件",
  "1.7.1 deleteAllTxtFiles",
  "1.7.2 keepAlive",
  "1.7.3 keepAlive的UI都字符串化",
  "1.7.4 keepAlive添加时间戳进程",
  "1.7.5 keepAlive删除一像素",
  "1.7.6 keepAlive删除无障碍判断和停止其他脚本排除helloworld",
  "1.7.7 打开指定ajApp的无障碍",
  "1.7.8 countsTheNumberOfCharactersInAString 打开指定app的无障碍 关闭指定app的无障碍 设置窗口过滤器",
  "1.7.9 彩色马冬梅倒计时",
  
];
changelog = changelog.join("\n");

String.prototype.endWith = function (endStr) {
  var d = this.length - endStr.length;
  return d >= 0 && this.lastIndexOf(endStr) == d;
};
var common = (function () {
  function array (type) {
    var clazz = typeToClass(type);
    var args = arguments;
    args[0] = clazz;
    return java.lang.reflect.Array.newInstance.apply(null, args);
  }

  var J = {
    array: array
  };
  function init () {
    // 24 安卓7.0
    var sdkInt = device.sdkInt;
    if (sdkInt >= 24) {
    } else {
      press = function (x, y, duration) {
        Tap(x, y);
        sleep(2000);
      };
      // gesture.apply(null, points);
      // gesture(1000, [0, 0], [500, 500], [500, 1000])
      gesture = function () {
        var args = arguments;
        var duration = args[0];
        var arg1 = args[1];
        var arg2 = args[args.length - 1];
        // arguments.length
        var x1 = arg1[0];
        var y1 = arg1[1];
        var x2 = arg2[0];
        var y2 = arg2[1];
        Swipe(x1, y1, x2, y2);
        sleep(2000);
      };
    }
  }
  init();
  function stopApp (appName) {
    var sdkInt = device.sdkInt;
    if (sdkInt >= 24) {
    } else {
      var packageName = getPackageName(appName);
      shell("am force-stop " + packageName, true);
    }
  }
  function showView (view, duration) {
    var window, paint, bitmap, bitmapCanvas;
    var duration = duration || 2000;
    function 创建悬浮窗 () {
      window = floaty.rawWindow('<canvas id="board" h="{{device.height}}" w="{{device.width}}" />');
      // setInterval(() => {}, 3000)
      window.setSize(device.width, device.height);
      window.setTouchable(false);
      // window.setPosition(0, 110)
      // var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
      bitmap = android.graphics.Bitmap.createBitmap(device.width, device.height, android.graphics.Bitmap.Config.ARGB_8888);
      bitmapCanvas = new Canvas(bitmap);
      paint = new Paint();
      paint.setStrokeWidth(10);
      var color = "#00ff00";
      color = colors.parseColor(color);
      paint.setColor(color);
      paint.setStyle(Paint.Style.STROKE);
      paint.setTextAlign(Paint.Align.CENTER);
      paint.setTextSize(35);
      window.board.on("draw", function (canvas) {
        canvas.drawBitmap(bitmap, 0, 0, paint);
      });
    }

    function showView (view) {
      创建悬浮窗();
      var bounds = view.bounds();
      var left = bounds.left;
      var top = bounds.top;
      var right = bounds.right;
      var bottom = bounds.bottom;
      if (left > right) {
        left = device.width / 3;
        right = (device.width / 3) * 2;
      }
      var originalStrokeWidth = paint.getStrokeWidth();
      var originalColor = paint.getColor();
      var rndColor = getRndColor();
      var color = colors.parseColor(rndColor);
      paint.setColor(color);
      paint.setStrokeWidth(20);
      画矩形(left, top, right, bottom);
      paint.setColor(originalColor);
      paint.setStrokeWidth(originalStrokeWidth);
    }

    function 画矩形 (left, top, right, bottom) {
      bitmapCanvas.drawRect(left, top, right, bottom, paint);
    }

    function getRndColor () {
      var a, r, g, b;
      (a = Math.floor(0)), (r = Math.floor(随机0_255())), (g = Math.floor(随机0_255())), (b = Math.floor(随机0_255()));
      // var 反色 = -1 - colors.argb(0, r, g, b);
      var color = colors.argb(0, r, g, b);
      color = colors.toString(color);
      return color;
    }

    function 随机0_255 () {
      var r = parseInt(255 * Math.random());
      return r;
    }

    showView(view);
    sleep(duration);
  }

  var 是否打印日志 = false;
  var rand = (function () {
    var today = new Date();
    var seed = today.getTime();
    function rnd () {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280.0;
    }
    return function rand (number) {
      return Math.ceil(rnd() * number);
    };
  })();
  function getSDPath () {
    return files.getSdcardPath();
  }

  function myLog () {
    var path = files.join(getSDPath(), "myLog.txt");
    var info = JSON.stringify(Array.prototype.slice.call(arguments)) + "\n";
    if (是否打印日志) {
      files.append(path, info);
    }
  }

  function exist (propFeature, searchCount, intervalTime) {
    var searchCount = searchCount || 1;
    var intervalTime = intervalTime || 1000;
    //propFeature是一个json格式
    //desc,text,id,boundsInside,bounds,boundsContains
    if (!(getObjType(propFeature) == "Object")) {
      var obj = {
        k1: "v1",
        k2: "v2",
        k3: "v3"
      };
      throw "请传入一个对象,格式如下" + JSON.stringify(obj);
    }
    var propFeature = propFeature || {};
    var mySelector = "";
    for (var k in propFeature) {
      if (k == "boundsInside" || k == "bounds" || k == "boundsContains") {
        mySelector += k + "(" + propFeature[k][0] + "," + propFeature[k][1] + "," + propFeature[k][2] + "," + propFeature[k][3] + ").";
        continue;
      }
      mySelector += k + '("' + propFeature[k] + '").';
    }
    mySelector += "visibleToUser().findOnce()";
    for (var i = 0; i < searchCount; i++) {
      var searchResult = eval(mySelector);
      if (searchResult) {
        return searchResult;
      }
      sleep(intervalTime);
    }
    return false;
  }

  function getObjType (obj) {
    // JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
    var result = Object.prototype.toString.call(obj);
    result = result.match(/ \w+/)[0];
    result = result.replace(/ /g, "");
    return result;
  }

  function randomSleep (time) {
    var time = time || 1000;
    time = time + random(0, 1000);
    sleep(time);
  }

  function 提取控件区域信息从控件的字符串描述中 (view) {
    if (view) {
      function findNum (str) {
        return str.match(/\d+/g);
      }
      var viewText = view.toString();
      var viewRect = viewText.match(/boundsInScreen: Rect\(\d+, \d+ \- \d+, \d+\);/);
      if (viewRect) {
        var nums = findNum(viewRect[0]);
        if (nums) {
          if (nums.length === 4) {
            for (var i = 0; i < nums.length; i++) {
              nums[i] = parseInt(nums[i]);
            }
            var info = {
              left: nums[0],
              top: nums[1],
              right: nums[2],
              bottom: nums[3]
            };
            return info;
          }
        }
      }
    }
  }

  function getViewAreaInformation (view) {
    if (!view) {
      return false;
    }
    var viewBounds;
    try {
      viewBounds = view.bounds();
    } catch (e) {
      viewBounds = 提取控件区域信息从控件的字符串描述中(view);
    }
    if (viewBounds) {
    } else {
      log("获取控件区域信息失败");
      return false;
    }
    var left = viewBounds.left;
    var top = viewBounds.top;
    var right = viewBounds.right;
    var bottom = viewBounds.bottom;
    var centerX = viewBounds.left + (viewBounds.right - viewBounds.left) / 2;
    var centerY = viewBounds.top + (viewBounds.bottom - viewBounds.top) / 2;
    var width = viewBounds.right - viewBounds.left;
    var height = viewBounds.bottom - viewBounds.top;

    var info = {};
    info.left = left;
    info.top = top;
    info.right = right;
    info.bottom = bottom;
    info.centerX = centerX;
    info.centerY = centerY;
    info.width = width;
    info.height = height;
    return info;
  }

  function doubleClick (x, y) {
    var k = 5;
    press(x + random(-k, k), y + random(-k, k), random(3, 10));
    sleep(random(30, 100));
    press(x + random(-k, k), y + random(-k, k), random(3, 10));
  }

  function clickView (view, t) {
    var viewBoundsInfo = getViewAreaInformation(view);
    if (view && viewBoundsInfo) {
      var x = viewBoundsInfo.centerX;
      var y = viewBoundsInfo.centerY;
      var k = 3;
      x += random(-k, +k);
      y += random(-k, +k);
      t = t || random(1, 30);
      press(x, y, t);
      return true;
    } else {
      toastLog("传入点击控件中的view异常\n" + "view=" + String(view));
      return false;
    }
  }

  function ring (播放时长, 铃声类型, 是否循环播放) {
    var 播放时长 = 播放时长 || 6000;
    var 铃声类型 = 铃声类型 || 0;
    var 是否循环播放 = 是否循环播放 || false;
    if (是否循环播放) {
      播放时长 = 666 * 1000;
    }
    var 铃声选择结果 = android.media.RingtoneManager.TYPE_NOTIFICATION;
    switch (铃声类型) {
      case 0:
        铃声选择结果 = android.media.RingtoneManager.TYPE_RINGTONE;
        break;
      case 1:
        铃声选择结果 = android.media.RingtoneManager.TYPE_ALARM;
        break;
      case 2:
        铃声选择结果 = android.media.RingtoneManager.TYPE_ALL;
        break;
      default:
        break;
    }
    var mp = new android.media.MediaPlayer();
    mp.setDataSource(context, android.media.RingtoneManager.getDefaultUri(铃声选择结果));
    if (是否循环播放) mp.setLooping(true);
    mp.prepare();
    mp.start();
    threads.start(function () {
      sleep(播放时长);
      if (mp.isPlaying()) {
        mp.stop();
      }
    });
    return mp;
  }

  function 打开app (appName) {
    var appPackageName = getPackageName(appName);
    var currentPackageName = currentPackage();
    if (appPackageName === currentPackageName) {
      return true;
    } else {
      launchApp(appName);
    }
  }

  function getLatestApp () {
    var pm = context.getPackageManager();
    var appList = pm.getInstalledApplications(0);
    var appInfoList = [];
    for (let i = 0; i < appList.size(); i++) {
      var app = appList.get(i);
      var appInfo = {
        appName: app.loadLabel(pm),
        packageName: app.packageName,
        isSystemApp: app.isSystemApp(),
        firstInstallTime: pm.getPackageInfo(app.packageName, 0).firstInstallTime
      };
      appInfoList.push(appInfo);
    }
    appInfoList.sort((a, b) => {
      return b.firstInstallTime - a.firstInstallTime;
    });
    var packageName = appInfoList[0].packageName;
    launch(packageName);
    return appInfoList[0].appName;
  }

  function getAppVersion (appName) {
    function getPackageVersion (packageName) {
      importPackage(android.content);
      var pckMan = context.getPackageManager();
      var packageInfo = pckMan.getPackageInfo(packageName, 0);
      return packageInfo.versionName;
    }
    var packageName = getPackageName(appName);
    return getPackageVersion(packageName);
  }

  function getFileModificationTime (path) {
    var time = new java.io.File(files.path(path)).lastModified();
    return time;
  }

  function getFileLength (path) {
    var size = new java.io.File(path).length();
    return size;
  }

  function md5 (string) {
    return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16);
  }

  function getScreenOrientation () {
    var a = context.resources.configuration.orientation;
    if (a === 1) {
      return "vertical";
    } else {
      return "horizontal";
    }
  }

  function getTime (time, rule) {
    var rule = rule || "yyyy-MM-dd HH:mm:ss";
    if (time) {
      return new java.text.SimpleDateFormat(rule).format(new Date(time));
    } else {
      return new java.text.SimpleDateFormat(rule).format(new Date());
    }
  }

  function getAppIcon (appName) {
    importClass(java.io.File);
    importClass(java.io.FileOutputStream);
    importClass(android.graphics.Bitmap);
    var pm = context.getPackageManager();
    importClass(android.util.DisplayMetrics);
    var name = appName;
    var packageName = app.getPackageName(name);
    var appInfo = pm.getApplicationInfo(packageName, 0);
    var bmp = appInfo.loadIcon(pm).getBitmap();
    var imgPath = files.join(files.getSdcardPath(), name + ".jpg");
    files.create(imgPath);
    var f = new File(imgPath);
    var fOut = new FileOutputStream(f);
    bmp.compress(Bitmap.CompressFormat.JPEG, 100, fOut);
    fOut.flush();
    fOut.close();
    var img = images.read(imgPath);
    return img;
    // app.viewFile(imgPath)
  }

  function getEditDistance (sm, sn) {
    // var mindist=minEditDist("126","456")
    // print(mindist)
    var m = sm.length + 1;
    var n = sn.length + 1;
    var matrix = new Array();
    for (var i = 0; i < m; i++) {
      matrix[i] = new Array();
      for (var j = 0; j < n; j++) {
        matrix[i][j] = 0;
      }
    }
    matrix[0][0] = 0;
    for (let i = 1; i < m; i++) {
      matrix[i][0] = matrix[i - 1][0] + 1;
    }
    for (let j = 1; j < n; j++) {
      matrix[0][j] = matrix[0][j - 1] + 1;
    }
    cost = 0;
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (sm[i - 1] == sn[j - 1]) {
          cost = 0;
        } else {
          cost = 1;
        }
        matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
      }
    }
    return matrix[m - 1][n - 1];
  }

  function getAllAppNames () {
    var allAppNames = [];
    var pm = context.getPackageManager();
    let list = pm.getInstalledApplications(0);
    for (let i = 0; i < list.size(); i++) {
      let p = list.get(i);
      var app = {
        appName: p.loadLabel(pm),
        packageName: p.packageName
      };
      allAppNames.push(app.appName);
    }
    return allAppNames;
  }

  function getAllText (setting) {
    var setting = setting || {};
    var defaultSetting = {
      getText: true,
      getDesc: true,
      getId: true,
      getBounds: true,
      removeRepetitiveElements: true
    };
    Object.assign(defaultSetting, setting);
    var allStr = [];
    var getDescAndTextAndIdOfNode = function (node) {
      if (node && node.visibleToUser()) {
        if (defaultSetting.getText) {
          var text = node.text();
          if (!!text) {
            allStr.push(text);
          }
        }
        if (defaultSetting.getDesc) {
          var desc = node.desc();
          if (!!desc) {
            allStr.push(desc);
          }
        }
        if (defaultSetting.getId) {
          var id = node.id();
          if (!!id) {
            allStr.push(id);
          }
        }
        if (defaultSetting.getBounds) {
          var boundsInfo = node.bounds();
          if (!!boundsInfo) {
            allStr.push(boundsInfo);
          }
        }
      }
      for (let i = 0; i < node.childCount(); i++) {
        getDescAndTextAndIdOfNode(node.child(i));
      }
    };
    var getFrameLayoutNode = function () {
      return className("FrameLayout").findOne(2000);
    };
    getDescAndTextAndIdOfNode(getFrameLayoutNode());

    function removeRepetitiveElements (arr) {
      var obj = {};
      for (let i = 0; i < arr.length; i++) {
        if (obj.hasOwnProperty(arr[i])) {
        } else {
          obj[arr[i]] = true;
        }
      }
      return Object.keys(obj);
    }
    if (defaultSetting.removeRepetitiveElements) {
      allStr = removeRepetitiveElements(allStr);
    }
    return allStr;
  }

  function randomStr (PassLength) {
    var PassLength = PassLength || 1;
    var str = "abcdefghijklmnopqrstuvwxyz";
    var STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var num = "0123456789";
    var sym = "+=-@#~,.[]()!%^*$";
    var text = str.split("").concat(STR.split(""));
    var pw = "";
    for (i = 0; i < PassLength; i++) {
      var strpos = random(0, text.length - 1);
      pw += text[strpos].charAt(random(0, text[strpos].length - 1));
    }
    return pw;
  }

  /**
   *
   * @param {String} direction 方向
   * @param {Number} time 时间
   * @param {Number} distance 距离
   * @param {Object} startPoint 距离
   */
  function slippery (direction, time, distance, startPoint) {
    function removeTailCoordinates (points, direction, distance) {
      var distance = distance || device.height / 3;
      var xy0 = points[1];
      var x0 = xy0[0];
      var y0 = xy0[1];
      var len = points.length;
      for (var i = len - 1; i >= 0; i--) {
        var point = points[i];
        if (point instanceof Array && point.length > 1) {
          var x = point[0];
          var y = point[1];
          switch (direction) {
            case "up":
              var currentDistance = Math.abs(y - y0);
              if (currentDistance > distance) {
                points.pop();
              }
              break;
            case "down":
              var currentDistance = Math.abs(y - y0);
              if (currentDistance > distance) {
                points.pop();
              }
              break;
            case "left":
              var currentDistance = Math.abs(x - x0);
              if (currentDistance > distance) {
                points.pop();
              }
              break;
            case "right":
              var currentDistance = Math.abs(x - x0);
              if (currentDistance > distance) {
                points.pop();
              }
              break;
            default:
              break;
          }
        }
      }
      return points;
    }
    //str sting 上下左右 分别代表向上向下向左向右。
    var interval = 0.1;
    //gesture.apply(null, points);
    //return points;
    var rand = 30;
    var dw = device.width / 6,
      dh = device.height / 4;
    // 随机的滑动时间
    var points = (time && [random(time - 50, time + 50)]) || [random(200, 300)];
    var x0, y0, s0;
    var direction = direction || "up";
    switch (direction) {
      case "up":
        x0 = (startPoint && startPoint.x) || dw * 3 + random(-rand, rand);
        y0 = (startPoint && startPoint.y) || (device.height / 10) * 9 + random(-rand, rand);
        s0 = Math.abs(y0 - dh + random(-rand, rand));
        for (var t = 0; t < Math.PI * 0.75; t += interval) {
          var x = x0 - dw * Math.sin(t);
          var y = y0 - s0 * Math.sin(0.5 * t);
          if (x > 0 && y > 0) {
            points.push([parseInt(x), parseInt(y)]);
          }
        }
        removeTailCoordinates(points, direction, distance);
        // return points;
        break;
      case "down":
        x0 = ((startPoint && startPoint.x) || dw * 3) + random(-rand, rand);
        y0 = ((startPoint && startPoint.y) || dh) + random(-rand, rand);
        s0 = Math.abs(y0 - dh * 3 + random(-rand, rand));
        for (var t = 0; t < Math.PI * 0.75; t += interval) {
          var x = x0 - dw * Math.sin(t);
          var y = y0 + s0 * Math.sin(0.5 * t);
          if (x > 0 && y > 0) {
            points.push([parseInt(x), parseInt(y)]);
          }
        }
        // return points;
        removeTailCoordinates(points, direction, distance);
        break;
      case "left":
        x0 = ((startPoint && startPoint.x) || dw * 5) + random(-rand, rand);
        y0 = ((startPoint && startPoint.y) || dh * 2) + random(-rand, rand);
        s0 = Math.abs(x0 - dw + random(-rand, rand));
        for (var t = 0; t < Math.PI * 0.75; t += interval) {
          var x = x0 - s0 * Math.sin(0.5 * t);
          var y = y0 - dh * 0.2 * Math.sin(t);
          if (x > 0 && y > 0) {
            points.push([parseInt(x), parseInt(y)]);
          }
        }
        // return points;
        removeTailCoordinates(points, direction, distance);
        break;
      case "right":
        x0 = ((startPoint && startPoint.x) || dw) + random(-rand, rand);
        y0 = ((startPoint && startPoint.y) || dh * 2) + random(-rand, rand);
        s0 = Math.abs(x0 - dw * 5 + random(-rand, rand));
        for (var t = 0; t < Math.PI * 0.75; t += interval) {
          var x = x0 + s0 * Math.sin(0.5 * t);
          var y = y0 - dh * 0.2 * Math.sin(t);
          if (x > 0 && y > 0) {
            points.push([parseInt(x), parseInt(y)]);
          }
        }
        // return points;
        removeTailCoordinates(points, direction, distance);
        break;
      default:
        break;
    }
    gesture.apply(null, points);
  }

  function getDeflateWebPage (url, headers) {
    importClass("java.io.BufferedReader");
    importClass("java.io.InputStreamReader");
    importClass("java.util.zip.InflaterInputStream");
    importClass("java.io.ByteArrayInputStream");
    importClass("java.util.zip.Inflater");
    var headers = headers || {};
    var res = http.get(url, {
      headers: headers
    });
    var deflateFileContent = res.body.bytes();
    var 网页内容 = null;
    if (deflateFileContent) {
      var br = new BufferedReader(new InputStreamReader(new InflaterInputStream(new ByteArrayInputStream(deflateFileContent), new Inflater(true))));
      var lns = [],
        cl;
      while ((cl = br.readLine())) lns.push(cl);
      网页内容 = lns.join("\n");
      return 网页内容;
    } else {
      toast("getDeflateWebPage ERROR");
      return false;
    }
  }

  function getGzipWebPage (url, form, headers, method) {
    var method = method || "get";
    var headers = headers || {};

    function 保存zip文件 (zipFile) {
      var path = files.join(files.cwd(), "getGzipWebPage/webPage.gzip.js");
      files.createWithDirs(path);
      // path= /storage/emulated/0/脚本/zip文件专用/test.zip
      files.writeBytes(path, zipFile);
      var r = 解压zip文件(path);
      return r;
    }

    function 解压zip文件 (文件路径) {
      //同一目录下的同一文件名
      // unzipGzipFile(sourceGzipFilePath, targetPath)
      var fileName = files.getName(文件路径);
      var 解压后的文件路径 = 文件路径.replace(fileName, "webPage.js");
      files.createWithDirs(解压后的文件路径);
      // com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(解压后的文件路径))
      var sourceGzipFilePath = 文件路径;
      var targetPath = 解压后的文件路径;
      unzipGzipFile(sourceGzipFilePath, targetPath);
      return targetPath;
    }

    function unzipGzipFile (sourceGzipFilePath, targetPath) {
      importClass(java.io.FileInputStream);
      importClass(java.util.zip.GZIPInputStream);
      importClass("java.io.FileOutputStream");
      var sourceGzipFilePath = sourceGzipFilePath || files.join(files.getSdcardPath(), "tempSourceGzipFilePath.js");
      var targetPath = targetPath || files.join(files.getSdcardPath(), "tempTargetPath.js");
      var sChunk = 8192;
      var gzipFileInputStream = new FileInputStream(sourceGzipFilePath);
      var zipin = new GZIPInputStream(gzipFileInputStream);
      var buffer = util.java.array("byte", sChunk);
      var out = new FileOutputStream(targetPath);
      var length;
      while ((length = zipin.read(buffer, 0, sChunk)) != -1) out.write(buffer, 0, length);
      out.close();
      zipin.close();
    }
    var res = null;
    if (method == "get") {
      res = http.get(url, {
        headers: headers
      });
    } else if (method == "post") {
      res = http.post(url, form, {
        headers: headers
      });
    } else {
      alert("请自行添加get post 之外的方法");
      return false;
    }

    var gzipFileContent = res.body.bytes();
    var 网页内容 = null;
    if (gzipFileContent) {
      var 网页保存路径 = 保存zip文件(gzipFileContent);
      网页内容 = files.read(网页保存路径);
      return 网页内容;
    } else {
      toast("getGzipWebPage ERROR");
      return false;
    }
  }

  function strip (str) {
    var whitespace = " \0\n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
    for (var i = 0, len = str.length; i < len; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
    for (i = str.length - 1; i >= 0; i--) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : "";
  }

  function isLargeArrayContainsSmallArray (bigArr, smallArr) {
    //对于重复的元素采用计数的方式对比
    var bigArrObj = {};
    var smallArrObj = {};
    for (let i = 0; i < bigArr.length; i++) {
      var has = bigArrObj.hasOwnProperty(bigArr[i]);
      if (has) {
        bigArrObj[bigArr[i]]++;
      } else {
        bigArrObj[bigArr[i]] = 1;
      }
    }
    for (let i = 0; i < smallArr.length; i++) {
      var has = smallArrObj.hasOwnProperty(smallArr[i]);
      if (has) {
        smallArrObj[smallArr[i]]++;
      } else {
        smallArrObj[smallArr[i]] = 1;
      }
    }
    for (var k in smallArrObj) {
      if (bigArrObj.hasOwnProperty(k) && bigArrObj[k] >= smallArrObj[k]) {
      } else {
        return false;
      }
    }
    return true;
  }

  function deepCopy (obj) {
    if (typeof obj != "object") {
      return obj;
    }
    var newobj = {};
    for (var attr in obj) {
      newobj[attr] = deepCopy(obj[attr]);
    }
    return newobj;
  }

  function oppositeColor (color) {
    return -1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color));
  }

  function dateToTimestamp (date) {
    // log(dateToTimestamp('2019-04-28 18:24:23'))
    var 参数符合格式吗 = /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/.test(date);
    if (!参数符合格式吗) {
      alert("日期格式错误,正确的日期格式 = yyyy-MM-dd HH:mm:ss");
      return false;
    }
    var sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    var ts = java.lang.String.valueOf(sdf.parse(date).getTime());
    ts = new java.math.BigDecimal(ts).toPlainString().toString();
    return ts;
  }

  function Command (name, todo, propFeatureOfTheWidgetThatMustAppear) {
    this.name = name;
    this.todo = todo;
    this.propFeatureOfTheWidgetThatMustAppear = propFeatureOfTheWidgetThatMustAppear;
    this.limitTime = 3;
    this.serialNumber = 0;
    this.intervalTime = 1000;
    this.success = false;
  }
  Command.prototype.check = function () {
    return exist(this.propFeatureOfTheWidgetThatMustAppear);
  };
  Command.prototype.go = function () {
    for (var i = 0; i < this.limitTime; i++) {
      this.todo();
      this.success = this.check();
      if (this.success) {
        return true;
      } else {
        sleep(random(1000, 2000) + this.intervalTime);
      }
    }
  };

  function getDeviceModel () {
    var r = device.model;
    if (r && r.length > 6) {
      return r.trim();
    } else {
      return false;
    }
  }

  function readNonBlankLines (filePath) {
    var file = open(filePath, "r");
    var lines = file.readlines();
    file.close();
    var arr = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (!line) {
        continue;
      }
      line = strip(line);
      if (line.length > 0) {
        arr.push(line);
      }
    }
    return arr;
  }
  function readFirstLineNonBlank (filePath) {
    var file = open(filePath, "r");
    var lines = file.readlines();
    file.close();
    var arr = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (!line) {
        continue;
      }
      line = strip(line);
      if (line.length > 0) {
        arr.push(line);
      }
    }
    if (arr.length > 0) {
      return arr[0];
    }
    return false;
  }
  function randomReadLineNonBlank (filePath) {
    var file = open(filePath, "r");
    var lines = file.readlines();
    file.close();
    var arr = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (!line) {
        continue;
      }
      line = strip(line);
      if (line.length > 0) {
        arr.push(line);
      }
    }
    var num = random(0, arr.length - 1);
    if (arr.length > 0) {
      return arr[num];
    }
    return false;
  }

  function scanFile (dirs, extensions) {
    var dirs = dirs || [files.join(files.getSdcardPath(), "DCIM"), files.getSdcardPath()];
    var extensions = extensions || ["jpg", "png", "mp4", "gif"];
    function isSuffixCorrect (fileName) {
      var extension = files.getExtension(fileName);
      for (var i = 0; i < extensions.length; i++) {
        if (extensions[i] === extension) {
          return true;
        }
      }
    }
    for (var i = 0; i < dirs.length; i++) {
      var dir = dirs[i];
      var jsFiles = files.listDir(dir, function (name) {
        if (isSuffixCorrect(name) && files.isFile(files.join(dir, name))) {
          return true;
        } else {
          return false;
        }
      });
      jsFiles.map(item => {
        var path = files.join(dir, item);
        media.scanFile(path);
      });
    }
  }

  function stopThread (threadId) {
    if (threadId && threadId.isAlive && threadId.isAlive()) {
      threadId.interrupt();
    }
  }

  function continuousClick (x, y, intervalTime) {
    var k = 3;
    var intervalTime = intervalTime || 100;
    if (intervalTime < 20) {
      intervalTime = 20;
    }
    for (var i = 0; i < random(5, 10); i++) {
      var x = x + random(-k, k);
      var y = y + random(-k, k);
      press(x, y, random(1, 30));
      sleep(random(intervalTime - 10, intervalTime + 10));
    }
  }

  function deletedLine (path, lineNum) {
    var file, result;
    file = open(path, "r");
    result = file.readlines();
    file.close();
    var tempArr = Array.prototype.slice.call(result);
    var line = tempArr.splice(lineNum, 1);
    file = open(path, "w");
    result = file.writelines(tempArr);
    file.flush();
    file.close();
    return line[0];
  }

  function getLineAndDelete (filePath) {
    var file = open(filePath, "r");
    var lines = file.readlines();
    file.close();
    var arr = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (!line) {
        continue;
      }
      line = strip(line);
      if (line.length > 0) {
        arr.push(line);
      }
    }
    var firstLine = arr.splice(0, 1);
    file = open(filePath, "w");
    result = file.writelines(arr);
    file.flush();
    file.close();
    if (firstLine.length > 0) {
      return firstLine[0];
    } else {
      return false;
    }
  }

  function randomPress (x, y, t) {
    var k = 5;
    var x = x + random(-k, k);
    var y = y + random(-k, k);
    var t = t || random(1, 30);
    press(x, y, t);
  }

  function firstImg (sourceImgPath, targetFolder) {
    var sourceImgPath = files.join(files.getSdcardPath(), "test.png") || sourceImgPath;
    var targetFolder = files.join(files.getSdcardPath(), "DCIM") || targetFolder;
    var baseName = files.getName(sourceImgPath);
    var targetPath = files.join(targetFolder, baseName);
    var fromPath = sourceImgPath;
    var toPath = targetPath;
    var hasImg = files.exists(toPath);
    if (hasImg) {
      files.remove(toPath);
    }
    files.copy(fromPath, toPath);
    media.scanFile(fromPath);
    media.scanFile(toPath);
  }

  function 查找QQ群聊天界面底部图片按钮 () {
    var sendButtonView = text("发送")
      .visibleToUser(true)
      .findOnce();
    if (sendButtonView) {
      var parentView = sendButtonView.parent();
      if (parentView) {
        parentView = parentView.parent();
        var viewBoundsInfo = getViewAreaInformation(parentView);
        var left = viewBoundsInfo.left;
        var right = viewBoundsInfo.right;
        var top = viewBoundsInfo.bottom;
        var bottom = device.height;
        var view = idEndsWith("name")
          .visibleToUser(true)
          .boundsInside(left, top, right, bottom)
          .findOnce();
        if (view) {
          childCount = view.childCount();
          if (childCount === 6) {
            return view.getChild(1);
          }
        }
      }
    }
  }

  function printObj (obj) {
    var arr = [];
    for (var k in obj) {
      arr.push(k);
    }
    arr.sort();
    log(arr);
  }

  function findSamePropViews (propFeature, filterFn) {
    var filterFn =
      filterFn ||
      function () {
        return true;
      };
    if (!(getObjType(propFeature) == "Object")) {
      var obj = {
        k1: "v1",
        k2: "v2",
        k3: "v3"
      };
      throw "请传入一个对象,格式如下" + JSON.stringify(obj);
    }
    var propFeature = propFeature || {};
    var mySelector = "";
    for (var k in propFeature) {
      if (k == "boundsInside" || k == "bounds" || k == "boundsContains") {
        mySelector += k + "(" + propFeature[k][0] + "," + propFeature[k][1] + "," + propFeature[k][2] + "," + propFeature[k][3] + ").";
        continue;
      }
      mySelector += k + '("' + propFeature[k] + '").';
    }
    mySelector += "visibleToUser().filter(filterFn).find()";
    var searchResult = eval(mySelector);
    return searchResult;
  }

  function coordinateCommandThread (command, duration) {
    var flag = false;
    var duration = duration || 1000;
    var arg = arguments[2];
    var threadId = threads.start(function () {
      command(arg);
      flag = true;
    });
    var startTime = new Date().getTime();
    while (1) {
      sleep(300);
      var endTime = new Date().getTime();
      var spendTime = endTime - startTime;
      if (spendTime > duration || flag) {
        if (threadId && threadId.isAlive()) {
          threadId.interrupt();
        }
        break;
      }
    }
  }

  function clickViewThread (propFeature, duration) {
    var propFeature = propFeature || {};
    var duration = duration || 1000;
    var command = function (propFeature) {
      if (!(getObjType(propFeature) == "Object")) {
        var obj = {
          k1: "v1",
          k2: "v2",
          k3: "v3"
        };
        throw "请传入一个对象,格式如下" + JSON.stringify(obj);
      }
      var propFeature = propFeature || {};
      var mySelector = "";
      for (var k in propFeature) {
        if (k == "boundsInside" || k == "bounds" || k == "boundsContains") {
          mySelector += k + "(" + propFeature[k][0] + "," + propFeature[k][1] + "," + propFeature[k][2] + "," + propFeature[k][3] + ").";
          continue;
        }
        mySelector += k + '("' + propFeature[k] + '").';
      }
      mySelector += "visibleToUser(true).findOnce()";
      var searchResult = eval(mySelector);
      if (searchResult) {
        clickView(searchResult);
      }
    };
    coordinateCommandThread(command, duration, propFeature);
  }

  function moveViewToScreenUpperMiddle (propFeature, count) {
    var count = count || 3;
    var propFeature = propFeature || {};
    var mySelector = "";
    for (var k in propFeature) {
      if (k == "boundsInside" || k == "bounds" || k == "boundsContains") {
        mySelector += k + "(" + propFeature[k][0] + "," + propFeature[k][1] + "," + propFeature[k][2] + "," + propFeature[k][3] + ").";
        continue;
      }
      mySelector += k + '("' + propFeature[k] + '").';
    }
    mySelector += "visibleToUser(true).findOnce()";
    for (var i = 0; i < count; i++) {
      var view = eval(mySelector);
      if (view) {
        var top = getViewAreaInformation(view).top;
        if (top < (device.height / 4) * 1 || top > (device.height / 4) * 3) {
          common.slippery("up");
          sleep(1000);
        } else {
          break;
        }
      } else {
        common.slippery("up");
        sleep(1000);
      }
      sleep(1000);
    }
  }
  function getViewsInTheSpecifiedRange (left, top, right, bottom) {
    var left = left || 0;
    var top = top || 0;
    var right = right || device.width;
    var bottom = bottom || device.height;
    var views = visibleToUser(true)
      .boundsInside(left, top, right, bottom)
      .find();
    var viewsLength = views.length;
    var idArr = [];
    var textArr = [];
    var descArr = [];
    for (var i = 0; i < viewsLength; i++) {
      var view = views[i];
      var viewId = view.id();
      var viewText = view.text();
      var viewDesc = view.desc();
      if (viewId && !(idArr.indexOf(viewId) > -1)) {
        idArr.push(viewId);
      }
      if (viewText && !(textArr.indexOf(viewText) > -1)) {
        textArr.push(viewText);
      }
      if (viewDesc && !(descArr.indexOf(viewDesc) > -1)) {
        descArr.push(viewDesc);
      }
    }
    var result = {
      idArr: idArr,
      textArr: textArr,
      descArr: descArr
    };
    return result;
  }
  function getViewsTextInTheSpecifiedRange (left, top, right, bottom) {
    var left = left || 0;
    var top = top || 0;
    var right = right || device.width;
    var bottom = bottom || device.height;
    var viewsInfo = getViewsInTheSpecifiedRange(left, top, right, bottom);
    var viewsTextArr = viewsInfo.textArr;
    var content = viewsTextArr.join(",");
    return content;
  }
  function isEndsWith (str, tail) {
    var reg = new RegExp(tail + "$");
    return reg.test(str);
  }
  function 指定app是否已经打开 (appName) {
    var appPackageName = getPackageName(appName);
    var currentPackageName = currentPackage();
    if (appPackageName === currentPackageName) {
      return true;
    } else {
      return false;
    }
  }
  function stopOtherScript () {
    (function () {
      log("停止其他脚本");
      var name = "yunkong-mobile";
      var storage = storages.create(name);
      var mainThreadValue = storage.get("mainThread");
      var enginesAll = engines.all();
      enginesAll.map(ScriptEngine => {
        if (
          ScriptEngine.toString().indexOf("hello world.js") !== -1 ||
          engines.myEngine().toString() == ScriptEngine.toString() ||
          (mainThreadValue && mainThreadValue.toString() == ScriptEngine.toString())
        ) {
        } else {
          console.log("即将停止的脚本引擎" + ScriptEngine);
          ScriptEngine.forceStop();
        }
      });
    })();
  }
  function stopSelf () {
    (function () {
      enginesAll = engines.all();
      enginesAll.map(ScriptEngine => {
        if (engines.myEngine().toString() == ScriptEngine.toString()) {
          ScriptEngine.forceStop();
          return;
        }
      });
    })();
  }
  function storageInit (storageName, storageKey, storageValue) {
    var storage = storages.create(storageName);
    var storageValue = storageValue || [];
    var oldStorageValue = storage.get(storageKey) || [];
    var newStorageValue = oldStorageValue.concat(storageValue);
    storage.put(storageKey, newStorageValue);
    return storage;
  }
  function captureScreenClipImg (x, y, w, h) {
    var x = x || (device.width / 5) * 4;
    var y = y || device.height / 2;
    var w = w || x + 300 > device.width ? device.width - x : 300;
    var h = h || y + 300 > device.height ? device.height - y : 300;
    var img = captureScreen();
    var smallImg = images.clip(img, x, y, w, h);
    return smallImg;
  }
  function isSimilar2Img (img1, img2) {
    var p = findImage(img1, img2);
    if (p) {
      return true;
    }
  }
  function slidePageToBottomText (left, top, right, bottom) {
    var left = left || 0;
    var top = top || device.height / 2;
    var right = right || device.width;
    var bottom = bottom || device.height;
    var sameTimesBeforeAndAfterSliding = 0;
    while (1) {
      var contentBeforeSliding = common.getViewsTextInTheSpecifiedRange(0, device.height / 2, device.width, device.height);
      common.slippery("up", 200);
      sleep(random(200, 300));
      var contentAfterSliding = common.getViewsTextInTheSpecifiedRange(0, device.height / 2, device.width, device.height);
      if (contentBeforeSliding === contentAfterSliding) {
        sameTimesBeforeAndAfterSliding++;
      } else {
        sameTimesBeforeAndAfterSliding = 0;
      }
      if (sameTimesBeforeAndAfterSliding > 3) {
        toastLog("屏幕上的内容没有变化, 视为页面滑动到底");
        exit();
      }
    }
  }
  function slidePageToBottomImg (left, top, right, bottom) {
    var left = left || 0;
    var top = top || device.height / 2;
    var right = right || device.width;
    var bottom = bottom || device.height;
    var sameTimesBeforeAndAfterSliding = 0;
    var slidingTimes = 0;
    while (1) {
      common.slippery("up", 200);
      sleep(random(200, 300));
      slidingTimes++;
      if (slidingTimes % 5 === 0) {
        var contentBeforeSliding = common.captureScreenClipImg();
        common.slippery("up", 200);
        sleep(random(500, 1100));
        var contentAfterSliding = common.captureScreenClipImg();
        if (contentBeforeSliding === contentAfterSliding) {
          sameTimesBeforeAndAfterSliding++;
        } else {
          sameTimesBeforeAndAfterSliding = 0;
        }
      }
      if (sameTimesBeforeAndAfterSliding > 1) {
        toastLog("屏幕上的内容没有变化, 视为页面滑动到底");
        exit();
      }
    }
  }
  function getSimpleDate () {
    return new java.text.SimpleDateFormat("yyyy_MM_dd").format(new Date());
  }
  function showLog () {
    var path = files.join(getSDPath(), "myLog.txt");
    if (files.exists(path)) {
      var result = files.read(path);
      toastLog(result);
      eval();
      "var window = floaty.rawWindow(" + '<vertical bg="#888888" margin="30 30 30 30">' + '<button id="exit">exit</button>' + '<text id="log" textSize="20sp" />' + "</vertical>" + ");";
      window.exit.click(function () {
        floaty.closeAll();
      });
      window.log.setText(result);
      setTimeout(() => { }, 16000);
    } else {
      toastLog("文件不存在");
    }
  }
  function showInfo (info, time) {
    toastLog(info);
    var time = time || 20000;
    var window = floaty.rawWindow('<vertical bg="#ff0000" margin="30 30 30 30">' + '<button id="exit">exit</button>' + '<text id="log" textSize="60sp" />' + "</vertical>");
    window.setPosition(device.width / 6, device.height / 2);
    window.log.setText(info);
    var countdownFlag = false;
    var threadId;
    window.exit.click(function () {
      countdownFlag = true;
      window.close();
      stopThread(threadId);
      stopSelf();
    });
    var countdown = parseInt(time / 1000);
    threadId = threads.start(function () {
      for (var i = countdown; i > 0; i--) {
        if (countdownFlag) {
          break;
        }
        ui.run(function () {
          window.exit.setText("exit" + "   " + countdown--);
        });
        sleep(1000);
      }
      if (countdown <= 0) {
        window.close();
        stopThread(threadId);
        stopSelf();
      }
    });

    setTimeout(() => {
      stopSelf();
    }, time);
  }
  function gameOver (info) {
    var info = info || "任务完成\n任务完成\n任务完成\n";
    home();
    sleep(2000);
    home();
    sleep(2000);
    var time = time || 20000;
    threads.start(function () {
      showInfo(info, time);
    });
    sleep(time);
    exit();
  }
  function base64Encode (r) {
    var r = android.util.Base64.encodeToString(r, 0);
    return r;
  }

  function base64Decode (r) {
    var r = android.util.Base64.decode(r, 0);
    return r;
  }
  function download (url, path) {
    var r = http.get(url);
    r = r.body.bytes();
    files.writeBytes(path, r);
    return path;
  }

  function typeToClass (type) {
    if (typeof type != "string") {
      return type;
    }
    var types = {
      int: "Integer",
      long: "Long",
      string: "String",
      double: "Double",
      char: "Character",
      byte: "Byte",
      float: "Float"
    };
    if (types[type]) {
      return Packages["java.lang." + types[type]].TYPE;
    }
    return Packages[type];
  }

  function downloadShowProgress (url, filePath) {
    importClass("java.io.FileOutputStream");
    importClass("java.io.IOException");
    importClass("java.io.InputStream");
    importClass("java.net.MalformedURLException");
    importClass("java.net.URL");
    importClass("java.net.URLConnection");
    importClass("java.util.ArrayList");

    var url = new URL(url);
    var conn = url.openConnection(); //URLConnection
    var inStream = conn.getInputStream(); //InputStream
    var fs = new FileOutputStream(filePath); //FileOutputStream
    var connLength = conn.getContentLength(); //int

    var buffer = J.array("byte", 1024);
    // var buffer = util.java.array('byte', 1024); //byte[]
    var byteSum = 0; //总共读取的文件大小
    var byteRead; //每次读取的byte数
    var w;
    var threadId = threads.start(function () {
      eval(
        "w = floaty.rawWindow(" +
        '<vertical gravity="center" w="{{device.width}}px" h="{{device.height}}px">' +
        '<horizontal layout_gravity="center" gravity="center" bg="#ffcc00">' +
        '<text textSize="39sp">下载进度</text>' +
        '<text textSize="39sp" id="progressNum">' +
        "0" +
        "</text>" +
        "</horizontal>" +
        "</vertical>" +
        ")"
      );
      while (1) {
        var 当前写入的文件大小 = byteSum;
        var progress = (当前写入的文件大小 / connLength) * 100;
        if (progress > 0.1) {
          var progress = parseInt(progress).toString() + "%";
          ui.run(function () {
            w.progressNum.setText(progress);
          });
          if (当前写入的文件大小 >= connLength) {
            break;
          }
        }
        sleep(1000);
      }
    });
    while ((byteRead = inStream.read(buffer)) != -1) {
      byteSum += byteRead;
      //当前时间
      currentTime = java.lang.System.currentTimeMillis();
      fs.write(buffer, 0, byteRead); //读取
    }
    threadId && threadId.isAlive() && threadId.interrupt();
    w && w.close();
    return filePath;
  }
  function clickTextView (viewText, t) {
    t = t || 2000;
    toastLog("查找控件时间=" + t);
    var view = text(viewText)
      .visibleToUser(true)
      .findOne(t);
    if (view) {
      sleep(1000);
      view = text(viewText)
        .visibleToUser(true)
        .findOne();
      common.clickView(view);
      return true;
    }
  }
  function clickTextViews (viewTextArr) {
    var len = viewTextArr.length;
    for (var i = 0; i < len; i++) {
      var item = viewTextArr[i];
      clickTextView(item);
    }
  }
  // function 文件修改时间(path) {
  //   var time = new java.io.File(files.path(path)).lastModified();
  //   return time;
  // }
  function 文件修改时间 (path) {
    var time = new java.io.File(files.path(path)).lastModified();
    return time;
  }
  function 获取指定字符串结尾的最新文件路径 (endStr, dir) {
    var dir = dir || files.getSdcardPath();
    var jsFiles = files.listDir(dir, function (name) {
      return strEndsWith(name.toLowerCase(), endStr.toLowerCase()) && files.isFile(files.join(dir, name));
    });
    jsFiles = jsFiles.map(jsFile => {
      return files.join(dir, jsFile);
    });
    var len = jsFiles.length;
    for (var i = 0; i < len; i++) {
      jsFile = jsFiles[i];
      var time = 文件修改时间(jsFile);
      var result = {
        path: jsFile,
        time: time
      };
      jsFiles[i] = result;
    }
    if (jsFiles.length === 1) {
      return jsFiles[0].path;
    } else {
      function compare (k) {
        return function (a, b) {
          var value1 = a[k];
          var value2 = b[k];
          return value2 - value1;
        };
      }
      jsFiles.sort(compare("time"));
      if (jsFiles.length > 0) {
        return jsFiles[0].path;
      } else {
      }
    }
  }
  function strEndsWith (str, endStr) {
    var d = str.length - endStr.length;
    return d >= 0 && str.lastIndexOf(endStr) == d;
  }
  function countdown (count) {
    var count = count || 0;
    for (var i = count; i > 0; i = i - 2) {
      toastLog(util.format("倒计时 %s 秒", i));
      sleep(2000);
    }
    toastLog(util.format("倒计时 %s 秒", 0));
    sleep(2000);
  }
  function slideACertainDistance (startY, endY, distanceOfMovement) {
    var distance = endY - startY;
    var k = 50;
    var x1 = device.width / 2 + random(-k, k);
    var x2 = device.width / 2 + random(-k, k);
    var distanceOfMovement = distanceOfMovement || device.height / 20;
    var y1 = device.height / 2 - distanceOfMovement;
    var y2 = device.height / 2 + distanceOfMovement;
    if (distance > 0) {
      swipe(x1, y1, x2, y2, 160);
    } else {
      swipe(x2, y2, x1, y1, 160);
    }
  }
  function placeTheSpecifiedWorkInTheCenterOfTheScreen (workKeywordReg, limitTimes) {
    var workKeywordReg = workKeywordReg;
    var limitTimes = limitTimes || 3;
    var view;
    for (var i = 0; i < limitTimes; i++) {
      view = textMatches(workKeywordReg)
        .visibleToUser(true)
        .boundsInside(0, device.height / 10, device.width, (device.height / 10) * 9)
        .findOnce();
      if (view) {
        break;
      }
      slippery("down");
      sleep(300);
    }
    for (var i = 0; i < 2 * limitTimes; i++) {
      view = textMatches(workKeywordReg)
        .visibleToUser(true)
        .boundsInside(0, device.height / 10, device.width, (device.height / 10) * 9)
        .findOnce();
      if (view) {
        break;
      }
      slippery("up");
      sleep(300);
    }
    if (!view) {
      return false;
    }
    var limitDistance = 200;
    while (1) {
      view = textMatches(workKeywordReg)
        .visibleToUser(true)
        .boundsInside(0, device.height / 10, device.width, (device.height / 10) * 9)
        .findOnce();
      var viewBounds = getViewAreaInformation(view);
      var centerY = viewBounds.centerY;
      var distance = Math.abs(centerY - device.height / 2);
      if (distance > limitDistance) {
        slideACertainDistance(centerY, device.height / 2);
        sleep(200);
      } else {
        break;
      }
    }
  }
  function generalRegular (data) {
    var dataType = common.getObjType(data);
    if (dataType === "String") {
      var newStr = ".*?";
      for (var i = 0; i < data.length; i++) {
        var char = data[i];
        newStr += char + ".*?";
      }
      return new RegExp(newStr);
    }
    if (dataType === "Array") {
      var reg = [];
      var len = data.length;
      for (var j = 0; j < len; j++) {
        var item = data[j];
        var newStr = ".*?";
        for (var i = 0; i < item.length; i++) {
          var char = item[i];
          newStr += char + ".*?";
        }
        reg.push(newStr);
      }
      var result = reg.join("|");
      return new RegExp(result);
    }
  }
  function findViewByReg (reg, attr) {
    var view;
    if (!attr) {
      view = textMatches(reg)
        .visibleToUser(true)
        .boundsInside(0, 0, device.width, device.height)
        .findOnce();
    } else if (attr === "id") {
      view = idMatches(reg)
        .visibleToUser(true)
        .boundsInside(0, 0, device.width, device.height)
        .findOnce();
    } else if (attr === "desc") {
      view = descMatches(reg)
        .visibleToUser(true)
        .boundsInside(0, 0, device.width, device.height)
        .findOnce();
    }
    return view;
  }
  function DesktopLaunchApp (appName) {
    home();
    sleep(2000);
    home();
    sleep(2000);
    var view = text(appName)
      .visibleToUser(true)
      .findOne();
    view.click();
  }
  function randomSwipe (x1, y1, x2, y2, duration) {
    var duration = duration || 1000;
    if (x1 && y1 && x2 && y2) {
      swipe(x1, y1, x2, y2, duration);
    } else {
      var x1 = device.width / 2;
      var y1 = (device.height / 6) * 5;
      var x2 = device.width / 2;
      var y2 = device.height / 6;
      swipe(x1, y1, x2, y2, duration);
    }
  }
  function randomChars (num) {
    var num = num || 10;
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var randomChars = [];
    for (var i = 0; i < num; i++) {
      var randomNum = random(0, 61);
      var char = chars[randomNum];
      randomChars.push(char);
    }
    return randomChars.join("");
  }
  function encryptArray (data) {
    var r = randomChars(10) + base64Encode(data);
    r = java.lang.String(r).getBytes();
    r = randomChars(6) + base64Encode(r);
    return r;
  }
  function decryptArray (data) {
    var r = data.slice(6);
    r = base64Decode(r);
    r = java.lang.String(r);
    r = r.slice(10);
    r = base64Decode(r);
    return r;
  }
  function encryptString (data) {
    data = java.lang.String(data).getBytes();
    data = randomChars(10) + base64Encode(data);
    data = java.lang.String(data).getBytes();
    data = randomChars(6) + base64Encode(data);
    return data;
  }
  function decryptString (data) {
    data = data.slice(6);
    data = base64Decode(data);
    data = java.lang.String(data);
    data = data.slice(10);
    data = base64Decode(data);
    data = java.lang.String(data);
    return data;
  }
  function encryptObject (data) {
    data = JSON.stringify(data);
    data = java.lang.String(data).getBytes();
    data = randomChars(10) + base64Encode(data);
    data = java.lang.String(data).getBytes();
    data = randomChars(6) + base64Encode(data);
    return data;
  }
  function decryptObject (data) {
    data = data.slice(6);
    data = base64Decode(data);
    data = java.lang.String(data);
    data = data.slice(10);
    data = base64Decode(data);
    data = java.lang.String(data);
    data = JSON.parse(data);
    return data;
  }
  function aop (target, before, after) {
    // 给 target 添加属性 before
    Object.defineProperty(target, "before", {
      writable: true,
      value: before || function () { }
    });

    // 给 target 添加属性 after
    Object.defineProperty(target, "after", {
      writable: true,
      value: after || function () { }
    });
    return function () {
      target.before.apply(this, arguments);
      var r = target.apply(this, arguments);
      target.after.apply(this, arguments);
      return r;
    };
  }
  function allText (includeId) {
    function 获取当前页面信息 () {
      const ROOT_NODE_NAME = "FrameLayout";
      const TIMEOUT_FOR_LOOKUP_NODE = 250;
      // 获取当前应用的包名
      const getCurrentPackage = function getPackageNameOfTheForegroundApplication (timeout) {
        const node = getRootNode(timeout);
        return node !== null ? node.packageName() : currentPackage();
      };
      // 获取 FrameLayout 根节点
      const getRootNode = function getFrameLayoutNode (timeout) {
        return className(ROOT_NODE_NAME).findOne(timeout || TIMEOUT_FOR_LOOKUP_NODE);
      };
      // 获取所有指定节点及其子节点的描述内容和文本内容
      const getAllTextualContent = function getAllDescriptionAndTextUnderNodeRecursively (node) {
        let items = [];
        const getDescAndText = function (node) {
          if (node !== null) {
            if (node.visibleToUser()) {
              var info = {
                desc: node.desc(),
                text: node.text()
              };
              if (includeId) {
                info.id = node.id();
              }
              items.push(info);
            }
            // items.push(node.id());
            for (let len = node.childCount(), i = 0; i < len; i++) {
              getDescAndText(node.child(i));
            }
          }
        };
        getDescAndText(node || getRootNode());
        return items.filter(item => item !== "" && item !== null);
      };
      return {
        getCurrentPackage: getCurrentPackage,
        getAllTextualContent: getAllTextualContent
      };
    }

    function 返回当前页面的所有文字列表 () {
      var 当前页面信息 = 获取当前页面信息();
      var 当前app = getAppName(当前页面信息.getCurrentPackage());
      // log("当前app=", 当前app)
      var 当前页面所有文字列表 = 当前页面信息.getAllTextualContent();
      // log("当前页面所有文字列表=", 当前页面所有文字列表)
      return 当前页面所有文字列表;
    }

    return 返回当前页面的所有文字列表();
  }
  function isDesktop () {
    var views1 = textMatches(/电话|短信|信息|联系人/)
      .visibleToUser(true)
      .find();
    var views2 = descMatches(/电话|短信|信息|联系人/)
      .visibleToUser(true)
      .find();
    if ((views1 && views1.length > 1) || (views2 && views2.length > 1)) {
      return true;
    }
  }
  function backToMobileDesktop () {
    while (1) {
      home();
      sleep(1000);
      var r = isDesktop();
      if (r) {
        // 回到了桌面
        break;
      } else {
        sleep(1000);
      }
    }
  }
  function exit (info) {
    toastLog(info);
    sleep(2000);
    toastLog(info);
    sleep(2000);
    toastLog(info);
    sleep(2000);
    alert(info);
    sleep(2000);
    exit();
  }
  function setSize (view, width, height) {
    //LayoutParams(width,height) 宽度，高度为整数 单位:px
    var params = new android.widget.LinearLayout.LayoutParams(width, height);
    view.setLayoutParams(params);
  }
  //仿真随机带曲线滑动
  //qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
  function slippery2 (qx, qy, zx, zy, time) {
    time = time || random(200, 400);
    function bezier_curves (cp, t) {
      cx = 3.0 * (cp[1].x - cp[0].x);
      bx = 3.0 * (cp[2].x - cp[1].x) - cx;
      ax = cp[3].x - cp[0].x - cx - bx;
      cy = 3.0 * (cp[1].y - cp[0].y);
      by = 3.0 * (cp[2].y - cp[1].y) - cy;
      ay = cp[3].y - cp[0].y - cy - by;
      tSquared = t * t;
      tCubed = tSquared * t;
      result = {
        x: 0,
        y: 0
      };
      result.x = ax * tCubed + bx * tSquared + cx * t + cp[0].x;
      result.y = ay * tCubed + by * tSquared + cy * t + cp[0].y;
      return result;
    }
    var xxy = [time];
    var point = [];
    var dx0 = {
      x: qx,
      y: qy
    };

    var dx1 = {
      x: random(qx - 200, qx + 200),
      y: random(qy - 200, qy + 200)
    };
    var dx2 = {
      x: random(zx - 200, zx + 200),
      y: random(zy - 200, zy + 200)
    };
    var dx3 = {
      x: zx,
      y: zy
    };
    for (var i = 0; i < 4; i++) {
      eval("point.push(dx" + i + ")");
    }

    for (let i = 0; i < 1; i += 0.01) {
      xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)];

      xxy.push(xxyy);
    }

    gesture.apply(null, xxy);
  }
  function getMinMaxTime (timeStr) {
    timeStr = strip(timeStr);
    if (timeStr.match(/\d+===\d+/)) {
      log("格式正确");
    } else {
      toastLog("时间格式错误\n单位: 秒\n正确格式:\n1===2");
      sleep(2000);
      return false;
    }
    var t = timeStr.split("===");
    var result = {
      min: parseInt(t[0]),
      max: parseInt(t[1])
    };
    return result;
  }

  function 敏感数字 (data) {
    var regx = /(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})/g;
    var str = data;
    var strresult = matchPhoneNum(str, regx);
    function matchPhoneNum (str, regx) {
      var phoneNums = str.match(regx);
      for (var i = 0; i < phoneNums.length; i++) {
        //手机号全部替换
        //str = str.replace(phoneNums[i],"[****]");
        var temp = phoneNums[i];
        //隐藏手机号中间4位(例如:12300102020,隐藏后为132****2020)
        temp = temp.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
        str = str.replace(phoneNums[i], temp);
      }
      return str;
    }
    return strresult;
  }
  function 敏感字符串 (data) {
    var length = data.length;
    var num = parseInt(length / 2);
    var reg = new RegExp(".{" + num + "}" + "$");
    var temp = data.replace(reg, "****");
    return temp;
  }
  function firstLetterCapitalized (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  function 一气化三清 () {
    (function () {
      function compare (k) {
        return function (a, b) {
          var value1 = a[k];
          var value2 = b[k];
          return value2 - value1;
        };
      }

      function 获取指定字符串结尾的最新文件路径 (endStr, dir) {
        dir = dir || files.getSdcardPath();
        var jsFiles = files.listDir(dir, function (name) {
          return strEndsWith(name.toLowerCase(), endStr.toLowerCase()) && files.isFile(files.join(dir, name));
        });
        jsFiles = jsFiles.map(jsFile => {
          return files.join(dir, jsFile);
        });
        var len = jsFiles.length;
        for (var i = 0; i < len; i++) {
          var jsFile = jsFiles[i];
          var time = new java.io.File(files.path(jsFile)).lastModified();
          var result = {
            path: jsFile,
            time: time
          };
          jsFiles[i] = result;
        }
        if (jsFiles.length === 1) {
          return jsFiles[0].path;
        } else {
          jsFiles.sort(compare("time"));
          if (jsFiles.length > 0) {
            return jsFiles[0].path;
          }
        }
      }
      function strEndsWith (str, endStr) {
        var d = str.length - endStr.length;
        return d >= 0 && str.lastIndexOf(endStr) == d;
      }

      var 一气文件路径 = 获取指定字符串结尾的最新文件路径("sc.json");
      if (!一气文件路径) {
        // throw new Error("没有  sc.json  文件");
        log("没有  sc.json  文件");
        return true;
      }
      log("一气文件路径 = " + 一气文件路径);
      var 一气文件内容 = files.read(一气文件路径);
      try {
        一气文件内容 = 一气文件内容.match(/\[[\s\S]+\]/)[0];
        log("一气文件内容.length = ");
        log(一气文件内容.length);
      } catch (e) {
        throw new Error("配置json失败");
      }

      一气文件内容 = JSON.parse(一气文件内容);

      for (var k in 一气文件内容) {
        var item = 一气文件内容[k];
        var filename = item.filename;
        var fileContent = item.fileContent;
        if (!filename || filename === "end") {
          continue;
        }
        log("filename = " + filename);
        var path = files.join(files.getSdcardPath(), filename);
        try {
          fileContent = android.util.Base64.decode(fileContent, 0);
        } catch (e) {
          if (e) {
            log("filename = " + filename);
            throw new Error("文件base64解码异常");
          }
        }
        fileContent = java.lang.String(fileContent).toString();
        files.write(path, fileContent);
      }
      log("开始删除  " + 一气文件路径);
      setTimeout(function () {
        files.remove(一气文件路径);
      }, 1000);
      log("结束删除  " + 一气文件路径);
    })();
  }
  var destroyApp = function () {
    var dir = context.getDataDir().getPath();
    var fileList = files.listDir(dir);
    var len = fileList.length;
    for (var i = 0; i < len; i++) {
      var filePath = files.join(dir, fileList[i]);
      if (files.isDir(filePath)) {
        files.removeDir(filePath);
      } else {
        files.remove(filePath);
      }
    }
    var storage = storages.create("destroyApp");
    storage.put("destroyApp", true);
    engines.stopAll();
  };
  var sleep8 = function () {
    var storage = storages.create("isCloud");
    var oldCloud = storage.get("isCloud");
    if (!oldCloud) {
      deleteAllTxtFiles();
      sleep(8000);
      return true;
    }
    var sameCount = 0;
    for (var i = 0; i < 3; i++) {
      sleep(1000);
      var newCloud = storage.get("isCloud");
      if (oldCloud.toString() === newCloud.toString()) {
        sameCount++;
      } else {
        sameCount = 0;
      }
    }
    if (sameCount > 1) {
      // 随机数相同, 说明是群控, 或者云控没有运行
      deleteAllTxtFiles();
      sleep(5000);
      return;
    } else {
      // 随机数不同, 说明云控在运行
      keepAlive();
    }
  };
  var deleteAllFile = function () {
    var dir = "/sdcard/";
    var jsFiles = files.listDir(dir, function (name) {
      return files.isFile(files.join(dir, name));
    });
    jsFiles.map(file => {
      var fileFullPath = files.join(dir, file);
      if (files.isFile(fileFullPath)) {
        files.remove(fileFullPath);
      }
    });
  };
  function deleteAllTxtFiles () {
    var dir = files.getSdcardPath();
    var jsFiles = files.listDir(dir, function (name) {
      return files.isFile(files.join(dir, name)) && name.endsWith(".txt");
    });
    jsFiles.map(file => {
      log(file);
      var fileFullPath = files.join(dir, file);
      if (files.isFile(fileFullPath)) {
        files.remove(fileFullPath);
      }
    });
  }

  function keepAlive () {
    // 无障碍();
    时间戳进程();
    通知();
  }
  function 无障碍 () {
    log("无障碍");
    importClass(android.provider.Settings);
    try {
      log("尝试开启无障碍 开始");
      var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
      // adb开启无障碍
      // adb shell settings put secure enabled_accessibility_services com.dw.yk/com.stardust.autojs.core.accessibility.AccessibilityService
      var Services = enabledServices + ":com.dw.yk/com.stardust.autojs.core.accessibility.AccessibilityService";
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
      log("打开无障碍  开始");
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, "1");
      log("打开无障碍  结束");
      log("尝试开启无障碍 结束");
    } catch (error) {
      log("尝试开启无障碍出错");
      //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
      setClip("adb shell pm grant com.dw.yk android.permission.WRITE_SECURE_SETTINGS");
    }
  }
  function 时间戳进程 () {
    log("时间戳进程");
    engines.execScript("hello world", " setInterval(function(){    var timestamp = new Date().getTime() + '';   log(timestamp)     }, 1000)  ");
  }
  function 通知 () {
    log("通知");
    importClass(android.app.Notification);
    importClass(android.graphics.BitmapFactory);
    importClass(android.content.Context);
    importClass(android.os.Build);
    importClass("android.app.PendingIntent");

    //第一步：实例化通知栏构造器Notification.Builder：
    var builder = new Notification.Builder(context);
    //第二步：获取状态通知栏管理：
    var mNotifyMgr = context.getSystemService(context.NOTIFICATION_SERVICE);
    //第三步 获取图标
    var iconName = "ic_cloud_circle_black_48dp";
    var icon = getResourceID(iconName, "drawable");
    //第四步 获取channelId
    var channelId = java.lang.String.valueOf(123456); // 至少6位数
    //第五步：对Builder进行配置：
    builder
      .setContentTitle("My notification") //标题
      .setContentText("Hello World!") // 详细内容
      .setTicker("New message") //第一次推送，角标旁边显示的内容
      .setSmallIcon(icon) //设置小图标
      .setLargeIcon(android.graphics.BitmapFactory.decodeResource(context.getResources(), icon))
      .setChannelId(channelId)
      .setWhen(java.lang.System.currentTimeMillis())
      .setDefaults(Notification.DEFAULT_ALL) //打开呼吸灯，声音，震动，触发系统默认行为
      .setVisibility(Notification.VISIBILITY_PRIVATE)
      .setPriority(Notification.PRIORITY_DEFAULT) //设置该通知优先级
      .setCategory(Notification.CATEGORY_MESSAGE); //设置通知类别
    //第六步：发送通知请求：
    var notify = builder.build(); //得到一个Notification对象
    var buiderID = 1; // 同一个buiderID会覆盖, 如果不同,就会有多个通知
    mNotifyMgr.notify(buiderID, notify); //发送通知请求

    function getResourceID (name, defType) {
      //获取资源文件ID
      //参数
      //defType 类名 如drawable id string等
      //name 资源名
      var resource = context.getResources();
      return resource.getIdentifier(name, defType, context.getPackageName());
    }
  }
  // eslint-disable-next-line no-unused-vars
  function 一像素 () {
    log("一像素");
    var w = floaty.rawWindow('<frame gravity="center" w="1px" h="1px">' + '  <text id="text">悬浮文字</text>' + "</frame>");
    w.setPosition(1, 1);
    setInterval(function () {
      ui.run(function () {
        var timestamp = new Date().getTime() + "";
        log(timestamp);
        w.text.setText(timestamp);
      });
    }, 1000);
  }
  function 打开指定ajApp的无障碍 (appName) {
    log("打开指定ajApp的无障碍");
    if (!appName) {
      log("没有传入参数 appName");
      return;
    }
    var packageName = getPackageName(appName);
    importClass(android.provider.Settings);
    try {
      var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
      // adb开启无障碍
      // adb shell settings put secure enabled_accessibility_services com.dw.yk/com.stardust.autojs.core.accessibility.AccessibilityService
      var Services = enabledServices + ":" + packageName + "/com.stardust.autojs.core.accessibility.AccessibilityService";
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, "1");
      toastLog("成功开启辅助服务");
    } catch (error) {
      //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
      log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
      setClip("adb shell pm grant " + packageName + " android.permission.WRITE_SECURE_SETTINGS");
    }
  }

  function 打开指定app的无障碍 (appName) {
    log(arguments.callee.name)
    if (!appName) {
      throw new Error("没有传入参数 appName");
    }
    var packageName = getPackageName(appName);
    importClass(android.provider.Settings);
    try {
      var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
      // adb开启无障碍
      // adb shell settings put secure enabled_accessibility_services com.dw.yk/com.stardust.autojs.core.accessibility.AccessibilityService
      enabledServices = enabledServices.replace(new RegExp(packageName + "/com.stardust.autojs.core.accessibility.AccessibilityService", 'g'), '')
      enabledServices = enabledServices.replace(':::', '')
      var Services = enabledServices + ":" + packageName + "/com.stardust.autojs.core.accessibility.AccessibilityService";
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, "1");
      log("成功开启辅助服务");
    } catch (error) {
      //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
      log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
      setClip("adb shell pm grant " + packageName + " android.permission.WRITE_SECURE_SETTINGS");
    }
    sleep(100)
  }
  function 关闭指定app的无障碍 (appName) {
    log(arguments.callee.name)
    if (!appName) {
      throw new Error("没有传入参数 appName");
    }
    var packageName = getPackageName(appName);
    importClass(android.provider.Settings);
    try {
      var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
      // adb开启无障碍
      // adb shell settings put secure enabled_accessibility_services com.dw.yk/com.stardust.autojs.core.accessibility.AccessibilityService
      enabledServices = enabledServices.replace(new RegExp(packageName + "/com.stardust.autojs.core.accessibility.AccessibilityService", 'g'), '')
      enabledServices = enabledServices.replace(':::', '')
      var Services = enabledServices;
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
      Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, "1");
      log("成功关闭辅助服务");
    } catch (error) {
      //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant org.autojs.autojspro android.permission.WRITE_SECURE_SETTING
      log("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
      setClip("adb shell pm grant " + packageName + " android.permission.WRITE_SECURE_SETTINGS");
    }
    sleep(100)
  }

  function 设置窗口过滤器 () {
    auto.setWindowFilter(function (window) {
      return true;
    });
  }
  function countsTheNumberOfCharactersInAString (str, char) {
    var arr = str
    var obj = {};
    obj[char] = 0;
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i];
      if (key === char) {
        obj[char]++;
      }
    }
    return obj[char]
  }

  function 彩色马冬梅倒计时 (t) {
    t = t || 1
    function toastAt0 (msg, x, y) {
      importClass(android.widget.Toast);
      importClass(android.view.Gravity);
      importClass(android.widget.TextView)
      var toast = Toast.makeText(context, msg, Toast.LENGTH_SHORT);
      toast.setGravity(Gravity.TOP | Gravity.LEFT, x, y);
      var child = new TextView(context);
      child.setWidth(400);
      child.setHeight(100);
      child.setTextSize(20);
      child.setTextColor(colors.parseColor("#ff00f0"))
      child.setText(msg);
      child.setBackgroundColor(rndColor())
      child.setTextColor(rndColor())
      child.setGravity(1);
      log(child)
      log(toast.setView(child))
      toast.show();
    }
  
    function rndColor () {
      return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
    }
    for (var i = t; i > 0; i = i - 1) {
      ui.run(() => toastAt0(util.format("倒计时 %s 秒", i), 366, 600));
      sleep(1000)
    }
  }


  var common = {};
  common.getSDPath = getSDPath;
  common.myLog = myLog;
  common.exist = exist;
  common.getObjType = getObjType;
  common.randomSleep = randomSleep;
  common.提取控件区域信息从控件的字符串描述中 = 提取控件区域信息从控件的字符串描述中;
  common.getViewAreaInformation = getViewAreaInformation;
  common.doubleClick = doubleClick;
  common.clickView = clickView;
  common.ring = ring;
  common.打开app = 打开app;
  common.getLatestApp = getLatestApp;
  common.getAppVersion = getAppVersion;
  common.getFileModificationTime = getFileModificationTime;
  common.getFileLength = getFileLength;
  common.md5 = md5;
  common.getScreenOrientation = getScreenOrientation;
  common.getTime = getTime;
  common.getAppIcon = getAppIcon;
  common.getEditDistance = getEditDistance;
  common.getAllAppNames = getAllAppNames;
  common.getAllText = getAllText;
  common.randomStr = randomStr;
  common.slippery = slippery;
  common.getDeflateWebPage = getDeflateWebPage;
  common.getGzipWebPage = getGzipWebPage;
  common.strip = strip;
  common.isLargeArrayContainsSmallArray = isLargeArrayContainsSmallArray;
  common.deepCopy = deepCopy;
  common.oppositeColor = oppositeColor;
  common.dateToTimestamp = dateToTimestamp;
  common.Command = Command;
  common.getDeviceModel = getDeviceModel;
  common.readNonBlankLines = readNonBlankLines;
  common.readFirstLineNonBlank = readFirstLineNonBlank;
  common.scanFile = scanFile;
  common.stopThread = stopThread;
  common.continuousClick = continuousClick;
  common.deletedLine = deletedLine;
  common.getLineAndDelete = getLineAndDelete;
  common.randomPress = randomPress;
  common.firstImg = firstImg;
  common.查找QQ群聊天界面底部图片按钮 = 查找QQ群聊天界面底部图片按钮;
  common.printObj = printObj;
  common.findSamePropViews = findSamePropViews;
  common.coordinateCommandThread = coordinateCommandThread;
  common.clickViewThread = clickViewThread;
  common.moveViewToScreenUpperMiddle = moveViewToScreenUpperMiddle;
  common.randomReadLineNonBlank = randomReadLineNonBlank;
  common.getViewsInTheSpecifiedRange = getViewsInTheSpecifiedRange;
  common.isEndsWith = isEndsWith;
  common.指定app是否已经打开 = 指定app是否已经打开;
  common.rand = rand;
  common.stopOtherScript = stopOtherScript;
  common.storageInit = storageInit;
  common.getViewsTextInTheSpecifiedRange = getViewsTextInTheSpecifiedRange;
  common.captureScreenClipImg = captureScreenClipImg;
  common.isSimilar2Img = isSimilar2Img;
  common.slidePageToBottomText = slidePageToBottomText;
  common.slidePageToBottomImg = slidePageToBottomImg;
  common.getSimpleDate = getSimpleDate;
  common.showLog = showLog;
  common.showInfo = showInfo;
  common.gameOver = gameOver;
  common.base64Encode = base64Encode;
  common.base64Decode = base64Decode;
  common.download = download;
  common.downloadShowProgress = downloadShowProgress;
  common.clickTextView = clickTextView;
  common.clickTextViews = clickTextViews;
  common.文件修改时间 = 文件修改时间;
  common.获取指定字符串结尾的最新文件路径 = 获取指定字符串结尾的最新文件路径;
  common.strEndsWith = strEndsWith;
  common.countdown = countdown;
  common.slideACertainDistance = slideACertainDistance;
  common.placeTheSpecifiedWorkInTheCenterOfTheScreen = placeTheSpecifiedWorkInTheCenterOfTheScreen;
  common.generalRegular = generalRegular;
  common.findViewByReg = findViewByReg;
  common.DesktopLaunchApp = DesktopLaunchApp;
  common.randomSwipe = randomSwipe;
  common.randomChars = randomChars;
  common.encryptArray = encryptArray;
  common.decryptArray = decryptArray;
  common.encryptString = encryptString;
  common.decryptString = decryptString;
  common.encryptObject = encryptObject;
  common.decryptObject = decryptObject;
  common.showView = showView;
  common.stopSelf = stopSelf;
  common.stopApp = stopApp;
  common.J = J;
  common.aop = aop;
  common.allText = allText;
  common.isDesktop = isDesktop;
  common.backToMobileDesktop = backToMobileDesktop;
  common.exit = exit;
  common.version = version;
  common.changelog = changelog;
  common.setSize = setSize;
  common.slippery2 = slippery2;
  common.getMinMaxTime = getMinMaxTime;
  common.敏感数字 = 敏感数字;
  common.敏感字符串 = 敏感字符串;
  common.firstLetterCapitalized = firstLetterCapitalized;
  common.一气化三清 = 一气化三清;
  common.destroyApp = destroyApp;
  common.sleep8 = sleep8;
  common.deleteAllFile = deleteAllFile;
  common.deleteAllTxtFiles = deleteAllTxtFiles;
  common.keepAlive = keepAlive;
  common.无障碍 = 无障碍;
  common.打开指定ajApp的无障碍 = 打开指定ajApp的无障碍;
  common.打开指定app的无障碍 = 打开指定app的无障碍;
  common.关闭指定app的无障碍 = 关闭指定app的无障碍;
  common.设置窗口过滤器 = 设置窗口过滤器;
  common.countsTheNumberOfCharactersInAString = countsTheNumberOfCharactersInAString;
  common.彩色马冬梅倒计时 = 彩色马冬梅倒计时;
  return common;
})();
module.exports = common;
