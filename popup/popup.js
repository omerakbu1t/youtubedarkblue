
var collapsed = true

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
window.onload = function(){


    chrome.tabs.query({active: true, currentWindow: true,url:"*://*.youtube.com/*"}, function(tabs) {
        if(tabs.length <1){
            open("https://www.youtube.com")
        }
      });

    var iconph = document.getElementById("iconurl")
    var cbtheme = document.getElementById("cbtheme");
    var cbicon = document.getElementById("cbicon");
    var cbnet = document.getElementById("cbnet");
    var cbvtool2 = document.getElementById("cbvtool2");
    var selectorrow = document.getElementById("iconselectorrow");
    var collapse = document.getElementById("collapse");

 
    chrome.storage.sync.get("ytenabled", function (obj) {
        if (obj["ytenabled"] == true){
            cbtheme.checked = true;
        }else{
            cbtheme.checked = false;
        }
    });


    chrome.storage.sync.get("iconenabled", function (obj) {
        if (obj["iconenabled"] == true){
            cbicon.checked = true;
            selectorrow.style.display = "block"

        }else{
            cbicon.checked = false;
            selectorrow.style.display = "none"
        }
    });

    chrome.storage.sync.get("netenabled", function (obj) {
        if (obj["netenabled"] == true){
            cbnet.checked = true;
        }else{
            cbnet.checked = false;
        }
    });




    chrome.storage.sync.get("vdenabled", function (obj) {
        if (obj["vdenabled"] == true){
            cbvtool2.checked = true;
        }else{
            cbvtool2.checked = false;
        }
    });




    chrome.storage.sync.get("iconurl", function (obj) {
        if (obj["iconurl"]){
            iconph.value = obj["iconurl"]
            if (checkURL(iconph.value)){
                chrome.storage.sync.set({'iconurl':iconph.value});
                print("url!")
                document.getElementById("preview").style.content = `url(${iconph.value})`;
                document.getElementById("preview").style.display = "block"
            }else{
                document.getElementById("preview").style.display = "none"
            }
       }
    });



    cbtheme.addEventListener("change",function(){
        if(this.checked) {


            
            chrome.storage.sync.set({'ytenabled':true},function(){
                chrome.storage.sync.get("ytenabled", function (obj) {
                    console.log(obj["ytenabled"]);
                });
            })
        }else{
            chrome.storage.sync.set({'ytenabled':false},function(){
                console.log("Saved! false")
            })
        };
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
          });



    })









    collapse.addEventListener("click",function(){
            document.getElementById("collapsable").classList.toggle("hidden")
            collapse.classList.toggle("flip")
            

        collapsed = !collapsed
    })









    cbicon.addEventListener("change",function(){
        if(this.checked) {


            
            chrome.storage.sync.set({'iconenabled':true},function(){
                chrome.storage.sync.get("iconenabled", function (obj) {
                    console.log(obj["iconenabled"]);
                });
                selectorrow.style.display = "block"
            })
        }else{
            chrome.storage.sync.set({'iconenabled':false},function(){
                console.log("Saved! false")
                selectorrow.style.display = "none"
            })
        };
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
          });



    })

    cbnet.addEventListener("change",function(){
        if(this.checked) {

            chrome.storage.sync.set({'netenabled':true},function(){
                chrome.storage.sync.get("netenabled", function (obj) {
                    console.log(obj["netenabled"]);
                });
            })
        }else{
            chrome.storage.sync.set({'netenabled':false},function(){
                console.log("Saved! false")
            })
        };
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
          });



    })




    cbvtool2.addEventListener("change",function(){
        if(this.checked) {

            chrome.storage.sync.set({'vdenabled':true},function(){
                chrome.storage.sync.get("vdenabled", function (obj) {
                    console.log(obj["vtenabled"]);
                });
            })
        }else{
            chrome.storage.sync.set({'vdenabled':false},function(){
                chrome.storage.sync.get("vdenabled", function (obj) {
                    console.log(obj["vdenabled"]);
                });
            })
        };
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
          });



    })





    iconph.addEventListener("input",function(){
        if (checkURL(iconph.value)){
            chrome.storage.sync.set({'iconurl':iconph.value});
            print("url!")
            document.getElementById("preview").style.content = `url(${iconph.value})`;
            document.getElementById("preview").style.display = "block"
        }else{
            document.getElementById("preview").style.display = "none"
        }

    })


    document.getElementById("refresh").addEventListener("click",function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
          });


    });



    for(var x = 0; x < document.getElementsByClassName("selectable").length; x++){
        document.getElementsByClassName("selectable")[x].addEventListener("click",function(){

            iconph.value = this.firstChild.src
            chrome.storage.sync.set({'iconurl':iconph.value})
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.reload(tabs[0].id);
                chrome.storage.sync.set({'iconurl':iconph.value});
                print("url!")
                document.getElementById("preview").style.content = `url(${iconph.value})`;
                document.getElementById("preview").style.display = "block"
    
              });

        })


    }
}


