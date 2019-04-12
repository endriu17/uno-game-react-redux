import React from 'react';
import Header from './Header';
import Footer from './Footer';

export class MainLayout extends React.Component {
    render() {
        return (
            <div className={'container'}> 
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}