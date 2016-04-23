window.onload = function(){
    var input = document.getElementById("file_input");
    if(typeof FileReader==='undefined'){
        result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
        input.setAttribute('disabled','disabled');
    }else{
        input.addEventListener('change',readFile,false);
    }

}
function readFile(){
    var result = document.getElementById("result");
    var file = this.files[0];
    if(!/image\/\w+/.test(file.type)){
        alert("文件必须为图片！");
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        result.innerHTML = '<img src="'+this.result+'" id="pic" alt=""/>'
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.save();
        var img=document.getElementById("pic");
        ctx.drawImage(img,0,0);
    }
}
function convertCanvasToImage() {
    var link_img = document.getElementById("link_img");
    var canvas = document.getElementById("myCanvas");
//            var image = new Image();
//            image.src = canvas.toDataURL("image/png");
    var src = canvas.toDataURL("image/png");
    result.innerHTML = '<img src="'+src+'" id="pic" alt=""/>'
    link_img.innerHTML = "<a id='download_link' target='_blank' href='"+src+"'>下载</a>";
    //return image;
}

/* --------从这里开始--------- */
function save_my(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.save();
}
function restore_my(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.restore();
}
//透明度
function setAlpha(){
    var alpha = document.getElementById("alpha_text").value;
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    for (var i=0;i<imgData.data.length;i+=4)
    {
        imgData.data[i]=imgData.data[i];
        imgData.data[i+1]=imgData.data[i+1];
        imgData.data[i+2]=imgData.data[i+2];
        imgData.data[i+3]=alpha;
    }
    ctx.putImageData(imgData,0,0);
}
//反色
function oppositeColor(){
    var alpha = document.getElementById("alpha_text").value;
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    for (var i=0;i<imgData.data.length;i+=4)
    {
        imgData.data[i]=255-imgData.data[i];
        imgData.data[i+1]=255-imgData.data[i+1];
        imgData.data[i+2]=255-imgData.data[i+2];
        imgData.data[i+3]=alpha;
    }
    ctx.putImageData(imgData,0,0);
}