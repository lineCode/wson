
/**
 *  otool -L WsonTest
 *  install_name_tool -change ../../../mydl/build/Release/libmydl.dylib @executable_path/libmydl.dylib myexe
 * install_name_tool -change /System/Library/Frameworks/JavaScriptCore.framework/Versions/A/JavaScriptCore /Users/furture/Library/Developer/Xcode/DerivedData/WebKit-hjorogjvxdhlplcdpkxokomrpghd/Build/Products/Release/JavaScriptCore.framework/Versions/A/JavaScriptCore WsonTest
 
 install_name_tool -change /System/Library/Frameworks/JavaScriptCore.framework/Versions/A/JavaScriptCore ./JavaScriptCore.framework/Versions/A/JavaScriptCore  WsonTest
 *
 */

/**
 * util function for test
 * **/
var console = {};
console.log = log;
console.error = log;
console.warn = log;

wsonInit();

function treeEquals(a, b) {
    if(a == null || b == null){
        return a == b;
    }
    if(a == b){
        return true;
    }
    if(Array.isArray(a) && Array.isArray(b)){
        if(a.length != b.length){
            return false;
        }
        for(var index in a){
            if(!treeEquals(a[index], b[index])){
                return false;
            }
        }
    }
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    var largeProps = aProps;
    if(aProps.length < bProps.length){
        largeProps = bProps;
    }
    
    for (var i = 0; i < largeProps.length; i++) {
        var propName = largeProps[i];
        if(!treeEquals(a[propName], b[propName])){
            return false;
        }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
}

var wsonTestSuit = {
        /***
         * type test 
         */
        testDateType : function(){
            var date = new Date();
            var string = JSON.stringify(date);
            var wson = toWson(string);
            var back = parseWson(wson);
            if(string != back){
                quit("testDateType Failed " + string  + "  " + back);
            }else{
                console.log("pass data type test " + string + " back " + back);
            }
        },
        /**
         * test number 
         **/
        testNormal : function(value){
            var wson = toWson(value);
            var back = parseWson(wson);
            if(back != value){
                quit("testNormalFailed " + value + "  " + back);
            }else{
                console.log("pass testNormal type test " + value + " back " + back);
            }
        },
         /**
         * test json file, should back euqlas with json file
         **/
        testJSONFile : function(fileName){
            var _self = this;
            var str = readFile(fileName);
            var json = JSON.parse(str);
            var wson = toWson(json);
            var back = parseWson(wson);
            if(!treeEquals(json, back)){
                quit("testJSONFileFailed  "  +  fileName + "\n" + JSON.stringify(json) + " back " + JSON.stringify(back));
            }else{
                console.log("pass JSONFile test " + fileName);
            }
        },
         /**
         * test wson file, should back euqlas with json file
         **/
        testWSONFile : function(fileWson,  fileJSON){
            var _self = this;
            var json = readFile(fileJSON);
            var wson = readFile(fileWson, 'binary');
            var back = parseWson(wson);
            var json = JSON.parse(json);
            if(!treeEquals(json, back)){
                quit("testWSONFileFailed  "  +  fileWson + "\n" + JSON.stringify(json) + " back " + JSON.stringify(back));
            }else{
                console.log("pass WSONFile test " + fileWson);
            }
        },
        /**
         * test number 
         **/
        testNumber : function(number){
            var _self = this;
            _self.testNormal(99999999999999999999999);
            _self.testNormal(99999999999999999);
            _self.testNormal(-10);
            _self.testNormal(0);
            _self.testNormal(-1);
            console.log("pass number type test ");
        },

        testJSONFileList: function(){
            var _self = this;
            var dir = "/Users/furture/code/pack/java/src/test/resources";
            _self.testJSONFile(dir + "/media.json");
            _self.testJSONFile(dir + "/media2.json");
            _self.testJSONFile(dir + "/middle.json");
            _self.testJSONFile(dir + "/weex.json");


            _self.testJSONFile(dir + "/bug/bigNumber.json");
            _self.testJSONFile(dir + "/bug/bugintdouble.json");
        },
        testWSONFileList:function(){
            var _self = this;
            var dir = "/Users/furture/code/pack/java/src/test/resources";
            _self.testWSONFile(dir + "/media.wson", dir + "/media.json");
            _self.testWSONFile(dir + "/media2.wson" ,dir + "/media2.json");
            _self.testWSONFile(dir + "/middle.wson", dir + "/middle.json");
            _self.testWSONFile(dir + "/weex.wson", dir + "/weex.json");

            _self.testWSONFile(dir + "/bug/bigNumber.wson", dir + "/bug/bigNumber.json");
            _self.testWSONFile(dir + "/bug/bugintdouble.wson", dir + "/bug/bugintdouble.json");
        },
}

function runWsonTestSuit(){
    console.log("runing runWsonTestSuit start");
    wsonTestSuit.testDateType();
    wsonTestSuit.testNumber();
    wsonTestSuit.testJSONFileList();
    wsonTestSuit.testWSONFileList();
}
runWsonTestSuit();
wsonDestroy();
"all test suit pase"
