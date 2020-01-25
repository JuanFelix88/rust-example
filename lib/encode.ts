type NumbersTypes =
  | "u8"
  | "u16"
  | "u32"
  | "u64"
  | "i8"
  | "i16"
  | "i32"
  | "i64"
  | "f32"
  | "f64";

/**
 * **Pointer Memory**
 * - HEX number;
 * - id var;
 */
type PointerMemory = number;

type TypeValueMem = NumbersTypes | "str";

type CallbackFunctionDefault<T> = (event: CodeEncoder) => T;

interface Variable {
  mutable: boolean;
  scopeReference: () => Scope;
  pointer: PointerMemory;
  name: string;
  value: any;
  type: TypeValueMem;
}

type ScopeTypes = "module" | "func" | "class" | "object" | "unckown" | "thread";

interface Scope {
  name: string;
  childsRef?: Array<any>;
  type: ScopeTypes;
  context: Context;
  scopeParent: () => Scope | undefined;
}

interface Declaration {
  ref: () => any;
}

class Types {
  /**
   *
   *
   *
   *
   * This method generate a unsigned integer 8bits in bytecode
   * @length `1`;
   * @returns An Uint8Array withe one element;
   */
  public static u8(val: number): Uint8Array {
    if (val < 0 && val > 255)
      throw new TypeError(
        `Value argument not is u8 number, found value: ${val}`
      );
    return new Uint8Array([val]);
  }

  /**
   *
   *
   *
   *
   *
   * This method generate a str in bytecode
   * @length `unsigned`;
   * @returns An Uint8Array;
   */
  public static str(val: string): Uint8Array {
    if (typeof val !== "string")
      throw new TypeError(
        `Value argument not is str type, found type value: ${typeof val}`
      );

    const str: number[] = val.split("").map(char => char.charCodeAt(0));

    return new Uint8Array([...str]);
  }
}

/**
 *
 *
 *
 *
 *
 */
class MemoryBaseApplication {
  protected variables: Variable[] = [];
  protected declarations: Declaration[] = [];
  protected scopes: Scope[] = [];
  protected actualIndexScope: number = 0;

  protected registerVariable(
    scope: Scope,
    mutable: boolean,
    nameVar: string,
    type: TypeValueMem,
    pointer: PointerMemory,
    staticValue: any
  ): void {
    // register in variable
    const varIndex =
      this.variables.push({
        name: nameVar,
        mutable: mutable,
        scopeReference: () => scope,
        type,
        pointer,
        value: staticValue
      }) - 1;

    // register in declarations
    const declarationIndex =
      this.declarations.push({
        ref: () => this.variables[varIndex]
      }) - 1;

    scope.context.push(this.declarations[declarationIndex]);
  }
}

type Context = Array<Declaration>;

/**
 *
 *
 *
 *
 *
 *
 */
class CodeEncoder extends MemoryBaseApplication {
  public Types = Types;
  constructor(public moduleName: string) {
    super();
  }

  /**
   * Get self scope
   */
  public get selfScope(): Scope {
    return this.scopes[this.actualIndexScope];
  }

  /**
   * Get self scope
   */
  public get selfParentScope(): Scope | undefined {
    return this.scopes[this.actualIndexScope - 1];
  }

  /**
   *
   */
  public defineVar(
    nameVar: string,
    type: TypeValueMem,
    pointer: PointerMemory,
    staticValue: CallbackFunctionDefault<Uint8Array | undefined>
  ): CodeEncoder {
    this.registerVariable(
      this.selfScope,
      true,
      nameVar,
      type,
      pointer,
      staticValue(this)
    );
    return this;
  }

  /**
   *
   *
   *
   * Declaration of Scope
   */
  public declareScope(
    name: string,
    type: ScopeTypes,
    scope: CallbackFunctionDefault<any>
  ): CodeEncoder {
    const idScope = this.scopes.push({
      name,
      type,
      context: [],
      scopeParent: () => this.selfParentScope
    });

    this.actualIndexScope = idScope - 1;

    this.declarations.push({
      ref: () => this.scopes[idScope]
    });

    scope(this);

    return this;
  }

  /**
   *
   */
  public declareFunction(
    name: string,
    pointer: PointerMemory,
    params: CallbackFunctionDefault<any>,
    context: CallbackFunctionDefault<any>
  ): CodeEncoder {
    return this;
  }

  public closeScope(adress: PointerMemory[]): void {
    this.actualIndexScope -= 1;
  }

  /**
   *
   *
   */
  public closeAndCompile(): void {
    console.table(this.declarations);
    console.table(this.variables);
    console.table(this.scopes);
  }
}

export default CodeEncoder;
