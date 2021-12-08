import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
                                //  umesto ovoga moze da se stavi (props), p se onda dole u h1 samo upise {props.title}
    // const dodajNovi = () => {
    //     console.log('click')
    // }

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button 
                color={showAdd ? 'red' : 'green'} 
                text={showAdd ? 'Zatvori' : 'Dodaj'} 
                onClick={onAdd} />
            {/* <Button color='blue' text='Edituj'/>   ---- mozemo dodavati koliko zelimo dugmica, samo zamenimo parametre
            <Button color='red' text='Obrisi'/> */} 
        </header>
    )
}


Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
