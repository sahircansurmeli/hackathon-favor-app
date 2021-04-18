import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ImageGalleryIcon(props) {
    return (
        <Svg
            height={30}
            viewBox="0 0 30 30"
            width={30}
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M17.453 24c-.168 0-.34-.021-.51-.066L1.48 19.793a2.018 2.018 0 01-1.414-2.45l1.951-7.272a.5.5 0 01.966.258l-1.95 7.27c-.139.53.179 1.082.71 1.229L17.2 22.967a.995.995 0 001.217-.704l.781-2.894a.499.499 0 11.966.26l-.78 2.89A1.997 1.997 0 0117.453 24z" />
            <Path d="M22 18H6c-1.103 0-2-.897-2-2V4c0-1.103.897-2 2-2h16c1.103 0 2 .897 2 2v12c0 1.103-.897 2-2 2zM6 3c-.551 0-1 .449-1 1v12c0 .551.449 1 1 1h16c.551 0 1-.449 1-1V4c0-.551-.449-1-1-1z" />
            <Path d="M9 9c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-3c-.551 0-1 .449-1 1s.449 1 1 1 1-.449 1-1-.449-1-1-1zM4.57 16.93a.5.5 0 01-.354-.853l4.723-4.723c.566-.566 1.555-.566 2.121 0l1.406 1.406 3.892-4.67a1.502 1.502 0 011.142-.54h.011a1.5 1.5 0 011.139.523l5.23 6.102a.5.5 0 11-.759.651l-5.23-6.102a.495.495 0 00-.38-.174.53.53 0 00-.384.18l-4.243 5.091a.498.498 0 01-.362.179.481.481 0 01-.376-.146l-1.793-1.793a.514.514 0 00-.707 0l-4.723 4.723a.498.498 0 01-.353.146z" />
        </Svg>
    )
}

export default ImageGalleryIcon;
