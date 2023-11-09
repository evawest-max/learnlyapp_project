import "./footer.css"

function Footer(){
    return(
        <div className="container">
            <div className="footer-container" >
                <div>
                    <h4 className="link-title">Quick Links</h4>
                    <div className="quick-links">
                        <p>About Us</p>
                        <p>Our mission and vision</p>
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                        <p>FAQ</p>
                    </div>
                </div>
                <div>
                    <h4 className="link-title">Contact Us</h4>
                    <div className="quick-links">
                        <p>contact@learnlyapp.com</p>
                        <div className="footer-image">
                        
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/2048px-Facebook_icon.svg.png" alt="facebook" width="30px"/>
                            <img src="https://static.vecteezy.com/system/resources/previews/024/170/870/original/instagram-icon-logo-symbol-free-png.png" alt="instagram" width="30px"/>
                            <a href="https://api.Whatsapp.com/send?phone=2347032397184&text=I%27m+having+an+issue+can+you+please+help+me+resolve+it"><img src="https://w7.pngwing.com/pngs/110/230/png-transparent-whatsapp-application-software-message-icon-whatsapp-logo-whats-app-logo-logo-grass-mobile-phones.png" alt="whats app" width="30px"/></a>
                            
                        </div>

                    </div>
                </div>
            </div>
            <p className="copyright-para"><img src="https://static.vecteezy.com/system/resources/previews/000/643/478/original/copyright-symbol-icon-vector.jpg" alt="copyright" width="20"/> 2023 Ebunolwa Akinwumi. All Rights reserved</p>
        </div>
    )
}

export default Footer