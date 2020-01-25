import CodeEncoder from "./encode";

const x = new CodeEncoder("big-space");

// prettier-ignore
export default x
  .declareScope("main", "module", x => x
    .defineVar("year", "i8", 0x0001, () => void 0)
    .defineVar("year_ref", "str", 0x0002, x => x.Types.u8(233))
    .defineVar("project", "str", 0x0003, x => x.Types.str("mobile"))
    .declareScope("get_name", "func", x => x
      .defineVar("child", "i32", 0x0004, () => void 0)
      .closeScope([])
    )
    .closeScope([])  
  )
  .closeAndCompile()
