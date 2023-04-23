import { useState, forwardRef, useImperativeHandle } from 'react'
import propTypes from'prop-types'

const Togglable = forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    const show = { display: visible ? 'none' : '' }
    const hide = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return{ toggleVisibility }
    })

    return(
        <div>
            <div style={show}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={hide}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: propTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable