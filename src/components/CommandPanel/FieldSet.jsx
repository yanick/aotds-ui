import React from 'react';

export default ({children,legend}) => <fieldset>
    <legend>{legend}</legend>
    { children }
</fieldset>;
