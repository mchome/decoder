new Vue({
    el: '#app',
    data: {
        text: '',
        codecs: ['gbk', 'big5', 'shift_jis'],
        encode: 'gbk'
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
            if (decode === null) {
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

// var test = 'D.C.III R 乣僟丒僇乕億III 傾乕儖乣_pv';
// var test1 = new TextEncoder('gbk', { NONSTANDARD_allowLegacyEncoding: true }).encode(test);
// var test2 = new TextDecoder('shift_jis').decode(test1);
// var test3 = array2hex(Array.from(test1));
// console.log(jschardet.detect(test3).encoding);
// console.log(test2);