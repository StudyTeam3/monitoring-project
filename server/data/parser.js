const fs = require('fs');

const getDataFromFile = function(filePath) {
    return new Promise((resolve, reject)=>{
      fs.readFile(filePath, 'utf-8', (err, result) => {
        if(result === undefined){
          reject(err);
        }else{
          resolve(result);
        }
      });
    }); 
  }; 


  const parseDataFromFile = function(data) {
      return new Promise((resolve, reject) => {
        let array = data.toString().split("\n");
        let res = [];

        for(index in array) {
            let log = array[index];
            var parsed = parseLog(log);
           // console.dir(parsed);
            res.push(parsed);
        }
        if(res === undefined){
            reject(err);
          }else{
            resolve(res);
          }
      })
  }

  /*  프로미스로 호출 사용 */
  getDataFromFile('vehicle_tab')
    .then(data=>{
       return parseDataFromFile(data);
    })
    .then(log => {
        console.log(log)
        fs.writeFile('parse2.json', JSON.stringify(log), (err) => {
         if (err) throw err;
         console.log('The file has been saved!');
});
    });




function parse_log(url) {
    const pattern = /^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2}.\d{3})\s(INFO|DEBUG)\s(.+)\s(.+)\s(bluelink|uvo)\s([\w\-]+)\s(\w+)[\s\-]+([\w\[\],\/-]+)[\s\-]+\[(Request|Response)\]\s\[(\w+)\]([\w\/-]+):\s([\w\"-\s\{\}:;\(\)-\\*/,.%]+)/;
    const matches = url.match(pattern);
    return {
        date : matches[1],
        time : matches[2],
        type : matches[3],
        app : matches[6],
        id : matches[7],
        isRequest : matches[11],
        isGET : matches[12],
        contents : matches[13]
    };
}

const parseVID = (uri) => {
    const pattern1 = /(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})([/a-z]+)/;
    const pattern2 = /\b((?!spa)\w[/a-z]+)(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/;
   
    try{
        const matches = uri.match(pattern1);
        return {
            car_id : matches[1],
            function : matches[2]
        }
    }catch {
        try {
            const matches = uri.match(pattern2);
            return {
                car_id : matches[2],
                function : '/' + matches[1].slice(0,-1)
            }
        }catch{
            return {car_id : null, function : null};
        }
    }
}

const parseLog = (data) => {

    const parseTab = data.split("\t");
    console.log(parseTab)
    const url = parseTab[4].substring(1, parseTab[4].length-1);//[, , ,]
    const flow = parseTab[5].substring(1, parseTab[5].length-3);
    let contents = parseTab[8].trim();
    let tmp = contents.substring(contents.indexOf("{"));
    const func = contents.substring(0, contents.indexOf("{"));
    try{
        if(contents.indexOf("{") < 4) contents = JSON.parse(contents);
        else contents = JSON.parse(tmp);
    }catch(e){
        contents = tmp;
    }
    return {
        time : parseTab[0].trim().replace(" ", 'T')+'Z', 
        log_level : parseTab[1].trim(), 
        server_range : parseTab[2].trim().split(" ")[0],
        server_name : parseTab[2].trim().split(" ")[1],
        service_name : parseTab[2].trim().split(" ")[2], 
        message_id: parseTab[3].trim(),
        protocol: url.split(",")[0],
        http_method: url.split(",")[1],
        uri: url.split(",")[2],
        source: flow.split(",")[0],
        destination: flow.split(",")[1],
        commu_type: parseTab[6].trim().slice(0,-1).substring(1),
        contents: (contents),
        success : contents.retCode === 'S' ? true : null,
        car_id : parseVID(url.split(",")[2]).car_id,
        function : parseVID(url.split(",")[2]).function
    }
}
