import MoveableManager from "./MoveableManager";
import { prefix, getControlTransform, throttle } from "./utils";
import { ResizableProps, ScalableProps, WarpableProps, Renderer } from "./types";
import { DIRECTION_INDEXES, DIRECTION_ROTATIONS, DIRECTIONS } from "./consts";
import { IObject } from "@daybrush/utils";

export function renderControls(
    moveable: MoveableManager<Partial<ResizableProps & ScalableProps & WarpableProps>>,
    defaultDirections: string[],
    React: Renderer,
): any[] {
    const {
        renderPoses,
        rotation,
    } = moveable.state;
    const {
        renderDirections: directions = defaultDirections,
    } = moveable.props;

    const directionMap: IObject<boolean> = {};
    directions.forEach(direction => {
        directionMap[direction] = true;
    });
    return directions.map(direction => {
        const indexes = DIRECTION_INDEXES[direction];

        if (!indexes || !directionMap[direction]) {
            return null;
        }
        const directionRotation = (throttle(rotation / Math.PI * 180, 15) + DIRECTION_ROTATIONS[direction]) % 180;

        return (
            <div className={prefix("control", "direction", direction)}
                data-rotation={directionRotation} data-direction={direction} key={`direction-${direction}`}
                style={getControlTransform(rotation, ...indexes.map(index => renderPoses[index]))}></div>
        );
    });
}
export function renderAllDirections(
    moveable: MoveableManager<Partial<ResizableProps & ScalableProps & WarpableProps>>,
    React: Renderer,
) {
    return renderControls(moveable, DIRECTIONS, React);
}
export function renderDiagonalDirections(
    moveable: MoveableManager<Partial<ResizableProps & ScalableProps & WarpableProps>>,
    React: Renderer,
): any[] {
    return renderControls(moveable, ["nw", "ne", "sw", "se"], React);
}
