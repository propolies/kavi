export function clickOutside(node: Node, callback: (node: Node) => void) {
  return outside(node, "click", callback)
}

export function tapOutside(node: Node, callback: (node: Node) => void) {
  return outside(node, "mousedown", callback)
}

export function outside(node: Node, listener: string, callback: (node: Node) => void) {
  
  const handleClick = (event: Event) => {
    const target = event.target as Node
    const ignored = document.getElementById("ignored")
    const isIgnored = ignored?.contains(target)
    if (node && !node.contains(target) && !isIgnored && !event.defaultPrevented) {
      callback(node)
    }
  }

	document.addEventListener(listener, handleClick);
  
  return {
    destroy() {
      document.removeEventListener(listener, handleClick);
    }
	}
}