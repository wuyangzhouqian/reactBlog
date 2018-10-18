/**
 * @author wuyang
 * @description
 */

import React from 'react'
import css from '../assets/styles/index.css'

export default class Index extends React.Component {
    static getInitialProps({ res, err }) {
        console.log(res);
        // if (!CSS in window || !CSS.paintWorklet) {
        //     document.write('不支持 Houdini');
        // } else {
        //     CSS.paintWorklet.addModule('sky.js')
        // }
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode }
    }

    render() {
        return (
            <div className={css['home']}>
            </div>
        )
    }
}