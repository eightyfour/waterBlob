/**
 *
 * waterBlob beta
 *
 * author eightyfour
 */
(function($){

    var $root,conf,$canvasBlob,
        cConf = {
            color1 : 'rgba(255, 255, 255, 0)',
            color2 : '100, 100, 100',
            color2Opacity : 0.4
        },
        _init = function(){
            $canvasBlob = $('<canvas/>',{'id':conf.id}).attr('width',conf.length).attr('height',conf.length);

            $canvasBlob.css({
                'position' : 'absolute',
                'z-index'  : '999999',
                'width'    : conf.length,
                'height'   : conf.length,
                'top'      : -conf.length,
                'left'     : -conf.length
            });
            $canvasBlob.appendTo($('body'));

            $root.bind('click',function waterBlob(e){
                // show effect
                var ctx,
                    x = e.pageX,
                    y = e.pageY,
                    $blobClone = $canvasBlob.clone(false),
                    gradient,
                    radius = 0,
                    opacity = cConf.color2Opacity

                $blobClone.css({
                    'top'    : y-(conf.length/2),
                    'left'   : x-(conf.length/2)
                });

                $blobClone.appendTo($('body'));
                ctx = $blobClone[0].getContext('2d');
                // animate blob effect
                (function blob(){

                    if(radius < (conf.length/2)){
                        _canvasReset(ctx);

                        gradient = ctx.createRadialGradient((conf.length/2), (conf.length/2), radius > 10? radius-10 : 0, (conf.length/2), (conf.length/2), radius);
                        gradient.addColorStop(0, cConf.color1);
                        if(radius > ((conf.length/2))-(conf.length/2)/3){
                            opacity -= 0.07;
                        }
                        gradient.addColorStop(0.7, 'rgba('+cConf.color2+','+opacity+')');
                        gradient.addColorStop(0.8, cConf.color1);

                        ctx.fillStyle = gradient;

                        ctx.beginPath();
                        ctx.arc((conf.length/2), (conf.length/2), radius, 0, 2*Math.PI, true);
                        ctx.fill();
                        radius = radius+1;
                        setTimeout(function(){
                            blob();
                        },conf.blobSpeed);
                    }else{
                        $blobClone.remove();
                    }
                })();

            });
        },
        _canvasReset = function(context){
            // Store the current transformation matrix
            context.save();
            // Use the identity matrix while clearing the canvas
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, conf.length, conf.length);
            // Restore the transform
            context.restore();
        };

    $.fn.waterBlob = function(config){
        $root = $(this);
        conf = $.extend({
            id: 'waterBlob',
            blobSpeed: 20,
            length: 60
        }, config);
        _init();
        return this;
    }

})(jQuery);
