//import 'systemjs-hot-reloader/default-listener.js';
import 'htmlcomponent';
import riot from 'riot';
import "tags/app.tag!";

System.trace = true;

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
	console.info("exec app 2");
	//htmlcomponent.query(document);

	tags["app"] = riot.mount(dom, 'app');
}
