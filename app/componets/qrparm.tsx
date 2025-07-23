import { useEffect, useRef, useState } from "react";
import style from "../styles/qrparm.module.css";
import QRPrev from "./qrprev";

function Qrparm() {
    const textInput = useRef<HTMLInputElement>(null);
    const color1 = useRef<HTMLInputElement>(null);
    const color2 = useRef<HTMLInputElement>(null);
    
    const [qrData, setQrData] = useState({
        text: '',
        primaryColor: '#000000',
        backgroundColor: '#ffffff'
    });

    const data_send = () => {
        setQrData({
            text: textInput.current?.value || '',
            primaryColor: color1.current?.value || '#000000',
            backgroundColor: color2.current?.value || '#ffffff'
            
        });
        setTimeout(() => {
            if (textInput.current) {
                textInput.current.value = '';
            }
        }, 1500);
    }
    useEffect(() => {
        // Initialize with default values
        setQrData({
            text: 'QR Code Gen Master',
            primaryColor: '#000000',
            backgroundColor: '#ffffff'
        });
    }, []);

    return (
        <>
        <QRPrev 
                text={qrData.text}
                primaryColor={qrData.primaryColor}
                backgroundColor={qrData.backgroundColor}
            />
            <section className={style.form_container}>
                <div className={style.input_group}>
                    <label htmlFor="text_input">Text Input</label>
                    <input 
                        type="text" 
                        id="text_input"
                        ref={textInput}
                        placeholder="Enter text to generate QR code"
                    />
                </div>
                <div className={style.input_countainer}>
                    <div className={style.input_group2}>
                        <label htmlFor="color_1">Primary Color</label>
                        <input 
                            type="color" 
                            id="color_2"
                            defaultValue="#000000"
                            ref={color1}
                        />
                    </div>
                    <div className={style.input_group2}>
                        <label htmlFor="color_2">Background Color</label>
                        <input 
                            type="color" 
                            id="color_1"
                            defaultValue="#ffffff"
                            ref={color2}
                        />
                    </div>
                </div>
                <button
                 className={style.submit_button} 
                 onClick={data_send}
                 
                >Generate QR Code</button>
            </section>
            
        </>
    );
}

export default Qrparm;