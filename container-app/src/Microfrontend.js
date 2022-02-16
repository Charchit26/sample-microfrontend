import React from 'react';

class MicroFrontend extends React.Component {

    renderMicroFrontend = () => {
        const { name, window, history } = this.props;

        window[`render${name}`] &&
        window[`render${name}`](`${name}-container`, history);
    };

    componentDidMount() {
        const { name, host, document } = this.props;
        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            this.renderMicroFrontend();
            return;
        }

        fetch(`${host}/asset-manifest.json`)
            .then(res => res.json())
            .then(manifest => {
                const promises = Object.keys(manifest['files'])
                    .filter(key => key.endsWith('.js'))
                    .reduce((sum, key) => {
                        sum.push(
                            new Promise(resolve => {
                                const path = `${host}${manifest['files'][key]}`;
                                const script = document.createElement('script');
                                if (key === 'main.js') {
                                    script.id = scriptId;
                                }
                                script.onload = () => {
                                    resolve();
                                };
                                script.src = path;
                                document.head.appendChild(script);
                            })
                        );
                        return sum;
                    }, []);

                Promise.allSettled(promises).then(() => {
                    this.renderMicroFrontend();
                });

                // const link = document.createElement("link");
                //
                // link.type = "text/css";
                // link.rel = "stylesheet";
                // link.href = `${host}${manifest['files']['main.css']}`;
                // document.head.appendChild(link);
            });
    }

    componentWillUnmount() {
        const { name, window } = this.props;
        window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    }

    render() {
        return <main id={`${this.props.name}-container`} />;
    }
}

MicroFrontend.defaultProps = {
    document,
    window
};

export default MicroFrontend;