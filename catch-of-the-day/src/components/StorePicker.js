import React from 'react';

class StorePicker extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p>Store Picker</p>
                {/* React Fragment allows for multiple tags without a div wrapper */}
                <form className="store-selector">
                    <h2>Select A Store</h2>
                    <input type="text" required placeholder="Store Name" />
                    <button type="submit">Visit Store &gt;</button>
                </form>
            </React.Fragment>

        )
    }
}

export default StorePicker;