export interface Role {
  name: string
  inheritsFrom: InheritsFrom[] // Role này kế thừa từ role nào?
  inheritedBy: InheritedBy[] // Những role nào kế thừa role này?
}

interface InheritsFrom {
  parent: Parent
}

interface Parent {
  name: string
}

interface InheritedBy {
  child: Child
}

interface Child {
  name: string
}
