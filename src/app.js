//import 'systemjs-hot-reloader/default-listener.js';
import 'htmlcomponent';

export default function main(dom, opts) {
	console.info("query document");
	htmlcomponent.query(document);
}
