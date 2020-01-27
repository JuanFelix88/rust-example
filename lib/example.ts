import CodeEncoder from "./encode";

const x = new CodeEncoder("big-space");

// prettier-ignore
export default x
  .declareScope("main", "module", x => x

    .defineImmutableVar("year", "i8", 0x0001, () => void 0)
    .defineImmutableVar("year_ref", "i8", 0x0002, x => x.refPointer(0x0001))
    .defineVar("project", "str", 0x0003, x => x.Types.str("mobile"))

    .declareFunction("get_name", 0x0004, "str", () => ["str", "u8"], x => x
      .defineImmutableVar("year", "u8", 0x0005, x => x.Types.u8(25))
    )

  )
  .closeAndCompile()
