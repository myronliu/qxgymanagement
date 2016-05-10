/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */
$(function() {
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'uploader-button',
        container: 'uploader-container',
        drop_element: 'uploader-container',
        max_file_size: '100mb',
        flash_swf_url: 'js/plupload/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        uptoken_url: $('#uptoken_url').val(),
        domain: $('#domain').val(),

        // downtoken_url: '/downtoken',
        // unique_names: true,
        // save_key: true,
        // x_vars: {
        //     'id': '1234',
        //     'time': function(up, file) {
        //         var time = (new Date()).getTime();
        //         // do something with 'time'
        //         return time;
        //     },
        // },
        
        auto_start: true,
        init: {
            'FilesAdded': function(up, files) {
                console.log("FilesAdded: ");

                console.log(up);
                console.log("files: " + files.length);
            },

            'BeforeUpload': function(up, file) {
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                console.log("BeforeUpload: " + chunk_size);
            },

            'UploadProgress': function(up, file) {
                console.log("UploadProgress: ");

                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                console.log("percent: " + file.percent + "%; speed: " + file.speed + "; chunk_size: " + chunk_size);
            },
            'UploadComplete': function() {
                console.log("UploadComplete: ");

                console.log($('#uptoken_url').val());
            },
            'FileUploaded': function(up, file, info) {
                console.log("FileUploaded: ");
                console.log(file);

                $.ajax('./uptoken',{
                    async: false
                }).done(function(data){
                    $.extend(info, data);
                    console.log(up);
                    console.log(info);
                }).error(function(){
                    console.log('获取下载token失败');
                });
            },
            'Error': function(up, err, errTip) {
                console.log("Error: ");
                console.log(err.file);
                console.log(errTip);
            }
              
        }
    });

    uploader.bind('FileUploaded', function() {
        console.log('hello man,a file is uploaded');
    });
});
