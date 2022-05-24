import './App.css';

const Footer = ()=>{
    return(
        <div className="Keeper-Footer" >
            <div className="Keeper-content" >
                <p className='Keeper-Para'> @copyroght {new Date().getFullYear().toString()} </p>
            </div>
        </div>
    )
}

export default Footer;