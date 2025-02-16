import './HeaderButton.css'

export default function HeaderButton({text, onClick}) {
    return(
        <button className='HeaderButton' onClick={onClick}>
            {text}
        </button>
    )
}