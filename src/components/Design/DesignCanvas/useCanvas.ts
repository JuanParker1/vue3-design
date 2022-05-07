import { useDesignStore } from "@/store/design.ts";

export function useCanvas(ContentMeauRef: any) {
  function handleContextMenu(e: any) {
    e.stopPropagation();
    e.preventDefault();

    const { setCurrWidget } = useDesignStore();

    let { target, offsetY: top, offsetX: left } = e;
    console.log('left', left);
    console.log('top', top);

    let { id } = target;

    if (id) {
      setCurrWidget(id);
    } else {
    }

    ContentMeauRef.value.showContextMenu({ top, left });
  }

  return {
    handleContextMenu,
  };
}
