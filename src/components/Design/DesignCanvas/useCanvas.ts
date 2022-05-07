import { useDesignStore } from "@/store/design.ts";
import { useActiontore } from "@/store/action.ts";

export function useCanvas(contentMeauRef: any, canvasRef: any) {
  const { openAction, closeAction } = useActiontore();


  function handleContextMenu(e: any) {
    console.log('e', e);
    e.stopPropagation();
    e.preventDefault();

    const { setCurrWidget } = useDesignStore();

    let { target, clientY: top, clientX: left } = e;

    let { id } = target;

    if (id) {
      setCurrWidget(id);
    } else {
    }

    const rectInfo = canvasRef.value.getBoundingClientRect();

    openAction({ top: top - rectInfo.y, left: left - rectInfo.x })
  }

  function handleDesignContainer() {
    closeAction()
  }

  return {
    handleContextMenu,
    handleDesignContainer
  };
}
