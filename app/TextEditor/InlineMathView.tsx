import { NodeViewWrapper } from "@tiptap/react";
import { useContext, useEffect, useRef } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import { MessageBarContext } from "../page";
import { toast } from "@/hooks/use-toast";

addStyles();

function Focuser() {
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      console.log(ref.current.parentElement.querySelector("textarea").focus());
    }, 1);
  }, []);

  return <div ref={ref} />;
}

export default (props: any) => {
  const content = props.node.attrs.content;
  const { setOpen } = useContext(MessageBarContext);

  return (
    <NodeViewWrapper className="inline-math">
      <div className="MATH_CONTAINER">
        <Focuser />
        <EditableMathField
          config={{
            autoCommands: "pi theta sqrt sum",
          }}
          latex={content}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") {
              e.stopPropagation();
              e.preventDefault();
              props.editor
                .chain()
                .focus()
                .setTextSelection(props.editor.state.selection)
                .run();
            }
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onChange={(mathField) => {
            props.updateAttributes({
              content: mathField.latex(),
            });
          }}
        />
      </div>
    </NodeViewWrapper>
  );
};
