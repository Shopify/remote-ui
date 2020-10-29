import baseHtm from 'htm';
import {isRemoteComponent} from '@remote-ui/core';
import type {RemoteRoot, RemoteComponent} from '@remote-ui/core';

export function createRender(root: RemoteRoot<any, any>) {
  return baseHtm.bind((type, props, ...children) => {
    const normalizedChildren: (string | RemoteComponent<any, any>)[] = [];

    for (const child of children) {
      if (child == null || child === false) continue;

      if (typeof child === 'object') {
        if (!isRemoteComponent(child)) {
          throw new Error(`Unexpected child: ${JSON.stringify(child)}`);
        }

        normalizedChildren.push(child);
      } else {
        normalizedChildren.push(String(child));
      }
    }

    return root.createComponent(type, props, normalizedChildren);
  });
}

export function append(
  parent: RemoteRoot<any, any> | RemoteComponent<any, any>,
  tree: ReturnType<ReturnType<typeof createRender>>,
) {
  if (Array.isArray(tree)) {
    for (const child of tree) {
      parent.appendChild(child);
    }
  } else {
    parent.appendChild(tree);
  }
}
