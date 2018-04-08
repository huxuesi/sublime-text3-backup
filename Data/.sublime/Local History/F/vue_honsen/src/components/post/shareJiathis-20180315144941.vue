<template>
    <!-- JiaThis Button BEGIN -->
    <div class="jiathis_style"><span class="jiathis_txt">分享到：</span>
        <a class="jiathis_button_qzone"></a>
        <a class="jiathis_button_tsina"></a>
        <!-- <a class="jiathis_button_tqq"></a> -->
        <a class="jiathis_button_weixin"></a>
        <!-- <a class="jiathis_button_douban"></a> -->
        <!--<a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis" target="_blank"></a>-->
        <!-- <a class="jiathis_counter_style"></a> -->
    </div>
    <!-- JiaThis Button END -->
</template>


<script>
export default {
    name: 'shareJiathis',
    mounted() {
        let sDomed = document.body.querySelector('#createdJiaThis');
        if(!sDomed){
            let sDom = document.createElement('script');
            sDom.setAttribute('id','createdJiaThis');
            sDom.setAttribute('type','text/javascript');
            sDom.setAttribute('charset','utf-8');
            sDom.setAttribute('src','http://v3.jiathis.com/code/jia.js');
            document.body.appendChild(sDom);
        }
    },
    beforeDestroy() {
        //删除jiathis创建的iframe
        let frames = document.querySelectorAll('iframe');
        if(frames && frames.length){
            Array.prototype.forEach.call(frames, function(frame) {
                frame.parentNode.removeChild(frame);
            });
        }
        //删除jiathis的script标签
        let sDomed = document.body.querySelector('#createdJiaThis');
        sDomed.parentNode.removeChild(sDomed);
    }
}
</script>