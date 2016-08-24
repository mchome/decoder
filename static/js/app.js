new Vue({
    el: '#app',
    data: {
        text: '',
        codecs: ['gbk', 'big5', 'shift_jis'],
        encode: 'gbk',
        set_decode: ''
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
            // convert typedarray to array
            if (!this.encodedtext) {
                return
            }
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
})

try {
    getmdlSelect.init('.mdl-tooltip');
} catch (error) {}