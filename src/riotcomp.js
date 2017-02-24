//import 'systemjs-hot-reloader/default-listener.js';
import riot from 'riot';
import "tags/app.tag!";

export var tags = {

};

export function __reload(m) {
	//if (m.component.state)
	//  component.setState(m.component.state);
	console.info("hotreload", m);

	m.tags["app"][0].unmount(true);
	tags = m.tags;
	m.default();
}

export default function main(dom, opts) {
	console.info("exec riot tag 'app'");

	tags["app"] = riot.mount(dom, 'app');
}
