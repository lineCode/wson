/*
 * Copyright (C) 2015 Apple, Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

#pragma once

#include "JSObject.h"
#include "WeakMapBase.h"

namespace JSC {

class JSWeakSet final : public WeakMapBase {
public:
    using Base = WeakMapBase;

    DECLARE_EXPORT_INFO;

    static Structure* createStructure(VM& vm, JSGlobalObject* globalObject, JSValue prototype)
    {
        return Structure::create(vm, globalObject, prototype, TypeInfo(JSWeakSetType, StructureFlags), info());
    }

    static JSWeakSet* create(VM& vm, Structure* structure)
    {
        JSWeakSet* instance = new (NotNull, allocateCell<JSWeakSet>(vm.heap)) JSWeakSet(vm, structure);
        instance->finishCreation(vm);
        return instance;
    }

    static JSWeakSet* create(ExecState* exec, Structure* structure)
    {
        return create(exec->vm(), structure);
    }

private:
    JSWeakSet(VM& vm, Structure* structure)
        : Base(vm, structure)
    {
    }

    static String toStringName(const JSObject*, ExecState*);
};

inline bool isJSWeakSet(JSCell* from)
{
    static_assert(std::is_final<JSWeakSet>::value, "");
    return from->type() == JSWeakSetType;
}

inline bool isJSWeakSet(JSValue from)
{
    static_assert(std::is_final<JSWeakSet>::value, "");
    return from.isCell() && from.asCell()->type() == JSWeakSetType;
}

} // namespace JSC
