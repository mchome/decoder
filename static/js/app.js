var app = new Vue({
    el: '#app',
    data: {
        text: '',
        codecs: ['gbk', 'big5', 'shift_jis'],
        encode: 'gbk',
        set_decode: '',
        drag_and_drop: false
    },
    computed: {
        result: function() {
            if (!this.decode) {
                return
            }
            let result = new TextDecoder(this.decode).decode(this.encodedtext);
            return result
        },
        decode: function() {
            if (!this.encodedtext) {
                return
            }
            // convert typedarray to array
            let arr = Array.from(this.encodedtext);
            let decode = jschardet.detect(this.array2hex(arr)).encoding;
            if (this.set_decode) { decode = this.set_decode; }
            if (!decode) {
                return decode
            }
            return decode.toLowerCase()
        },
        encodedtext: function() {
            try {
                let text = new TextEncoder(this.encode, { NONSTANDARD_allowLegacyEncoding: true }).encode(this.text);
                return text
            } catch (error) {
                console.log(error.name);
                return
            }
        }
    },
    methods: {
        // convert array to hex (not hex string)
        array2hex: function(arr) {
            let hexstr = arr.map(function(num) {
                num = String.fromCharCode(num);
                return num
            }).join('');
            return hexstr
        }
    }
});

(function() {
    try {
        getmdlSelect.init('.mdl-tooltip');
    } catch (error) {}

    let textfield = document.getElementById('app');
    textfield.ondragover = function(e) {
        e.preventDefault();
        app.$data.drag_and_drop = true;
    };
    textfield.ondrop = function(e) {
        e.preventDefault();
        let file = e.dataTransfer.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
            app.$data.text = e.target.result;
            document.getElementById('leftpanel').classList.add('is-dirty');
            app.$data.drag_and_drop = false;
        }
        reader.readAsText(file);
    };
}());