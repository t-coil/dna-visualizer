import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

const ColorSelector = ({ onChange, onClick, bases }) => {
    const colorPickers = bases.map(base =>
        <div key={base.id} id={base.id} className="color-picker">
            <button className="base-button" style={{ background: base.color }} onClick={() => onClick(base.id, !base.colorPicker)}>{base.id}</button>
            { base.colorPicker ?
                <div className="popover">
                    <div className="cover" />
                    <SketchPicker color={base.color} onChange={onChange} />
                </div>
                : null }
        </div>
    );

    return (
        <div className="color-container">
            {colorPickers}
        </div>
    );
};

ColorSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    bases: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        colorPicker: PropTypes.bool.isRequired
    })).isRequired
};

export default ColorSelector;
