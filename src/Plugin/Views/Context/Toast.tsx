/*
 * Copyright (c) 2016 David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */

namespace LiteMol.Plugin.Views.Context {
    "use strict";

    class ToastEntry extends React.Component<{ entry: Bootstrap.Components.Context.Toast.Entry }, {}> {                
        render() {
            let entry = this.props.entry;
            return <div className='lm-toast-entry'>
                <div className='lm-toast-message'>
                    <b>{entry.title}:</b> {entry.message}
                </div>
                <div className='lm-toast-hide'>
                    <Controls.Button onClick={() => (entry.hide || function () { }).call(null) } style='link' icon='abort' title='Hide' customClass='lm-btn-icon' />
                </div>
            </div>;                 
        }        
    }

    export class Toast extends View<Bootstrap.Components.Context.Toast, {}, {}> {

       render() {
            let state = this.controller.latestState;
            
            if (!state.entries.count()) return <div className='lm-empty-control' />
                        
            let entries: Bootstrap.Components.Context.Toast.Entry[] = [];
            state.entries.forEach((t, k) => entries.push(t!));
            entries.sort(function (x, y) { return x.serialNumber - y.serialNumber; })

            let toasts = entries.map(e => <ToastEntry key={e.serialNumber} entry={e} />);

            // toasts.push(<ToastEntry key={0} entry={{ message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut te.', title: 'Test Title' } as any} />);
            // toasts.push(<ToastEntry key={1} entry={{ message: 'Lorem ipsum, consectetuer adipiscin te.', title: 'Title' } as any} />);
                      
            return <div className='lm-toast-container'>                
                <div>
                    {toasts}
                </div>
            </div>;
        }
    }
}