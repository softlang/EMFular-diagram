export abstract class ArrowDragBase<TDragTarget> {
  protected dragTarget?: TDragTarget;
  protected svgRoot?: SVGSVGElement;

  private readonly boundDrag = (event: MouseEvent) => this.onDrag(event);
  private readonly boundEndDrag = () => this.onEndDrag();

  protected beginDrag(target: TDragTarget, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.dragTarget = target;
    this.svgRoot =
      (event.currentTarget as SVGElement).ownerSVGElement ?? undefined;

    window.addEventListener("mousemove", this.boundDrag);
    window.addEventListener("mouseup", this.boundEndDrag);
  }

  protected finishDrag(): void {
    this.dragTarget = undefined;
    this.svgRoot = undefined;
    this.removeDragListeners();
  }

  protected removeDragListeners(): void {
    window.removeEventListener("mousemove", this.boundDrag);
    window.removeEventListener("mouseup", this.boundEndDrag);
  }

  protected abstract onDrag(event: MouseEvent): void;
  protected abstract onEndDrag(): void;
}
