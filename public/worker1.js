onmessage = function (event) {
    // 处理百分比数据
    let _datearr = event.data.xAxis && event.data.xAxis[0];
    let _baseeries = event.data.series;
  
    let legendarr = [];//存放种类的数组
    let seriesarr = [];//存放每个种类每天占比的数组
    let datetotalarr = [];//存放每天数据的总和
    let datearr = _datearr;//日期数组
  
    //计算每天每个类别的总和数组
    for (let i = 0; i < datearr.length; i++) {
        let totalnum = 0;//当天各个种类数据总和
        for (var key in _baseeries) {
            let _data = _baseeries[key][i];
            totalnum = totalnum + _data;
        }
        datetotalarr.push(totalnum);
    }
  
    //重新处理每天每个种类的占比
    for (let i = 0; i < datearr.length; i++) {
        for (var key in _baseeries) {
            let _data = _baseeries[key][i];
            _baseeries[key][i] = (Math.floor(_data / datetotalarr[i] * 10000) / 10000) * 100;
            if (isNaN(_baseeries[key][i])) {
                _baseeries[key][i] = 0;
            }
        }
    }
  
    //对处理后的结果赋值
    for (var key in _baseeries) {
        legendarr.push(key);
        let obj = {
            name: key,
            barMaxWidth: 40,
            type: 'bar',
            stack: '总量',
            data: _baseeries[key]
        }
        seriesarr.push(obj);
    }
    let result = {}
    result.seriesarr = seriesarr;
    result.datearr = datearr;
    result.legendarr = legendarr;
    postMessage(result);
  }
  