---
title: Why Rust?
date: '2019-04-11'
spoiler: Rust is a new language released in 2015, as an alternative for C/C++, or other higher-level languages. Why yet another programming language? Let's explore its strengths now.
plink: 'https://img.haoqicat.com/2019041201.jpg'
video: 'https://youtu.be/AMt-whOk6Mk'
---

Rust is a new programming language released on May 15th 2015, providing an alternative to C/C++, but also higher-level languages. So the obvious question is

> Why yet another programming language ?

Now we are going to give the answer by showing rust's true strengths.

## It's Fast

If you are using some higher-level languages running on top of a abstraction layer, say Ruby or Python, you should try rust if you want your app to be more performant.
Rust is a compiled language, like C, it controls resource directly, that's why Rust code runs very fast and is good for writing system software. A lot of blockchain projects are using Rust, because app written in Rust can be really performant, due to Rust's ability to fully control the hardware.

![](https://img.haoqicat.com/2019041203.jpg)

Rust offers zero-cost abstraction. Rust has a lot of sweet high level language features over some abstractions. But Rust is carefully designed, so that all these abstractions are at no cost. The compiler will take care of them, and no runtime or garbage collector is required to support these abstractions.

![](https://img.haoqicat.com/2019041204.jpg)

Rust plays well with other languages. Rust interfaces to other languages through the C ABI at zero cost. you can use C library in Rust Code, or use Rust library in C code.

Now let's understand the Rust way with a demo. Ruby language has a method named `blank`, which is used to check if a string is blank. The ruby implementation is like this.

```ruby
class ::String
  def blank?
  /\A[[:space:]]*\z/ == self
  end
end
```

Looks simple, but performance is not so good, 964K iteration/sec.

So some [cool dude](https://github.com/SamSaffron/fast_blank) developed a fast blank with C.

```c
#include <stdio.h>
#include <ruby.h>
#include <ruby/encoding.h>
#include <ruby/re.h>
#include <ruby/version.h>

#define STR_ENC_GET(str) rb_enc_from_index(ENCODING_GET(str))

#ifndef RUBY_API_VERSION_CODE
# define ruby_version_before_2_2() 1
#else
# define ruby_version_before_2_2() (RUBY_API_VERSION_CODE < 20200)
#endif

static VALUE
rb_str_blank_as(VALUE str)
{
  rb_encoding *enc;
  char *s, *e;

  enc = STR_ENC_GET(str);
  s = RSTRING_PTR(str);
  if (!s || RSTRING_LEN(str) == 0) return Qtrue;

  e = RSTRING_END(str);
  while (s < e) {
    int n;
    unsigned int cc = rb_enc_codepoint_len(s, e, &n, enc);

    switch (cc) {
      case 9:
      case 0xa:
      case 0xb:
      case 0xc:
      case 0xd:
      case 0x20:
      case 0x85:
      case 0xa0:
      case 0x1680:
      case 0x2000:
      case 0x2001:
      case 0x2002:
      case 0x2003:
      case 0x2004:
      case 0x2005:
      case 0x2006:
      case 0x2007:
      case 0x2008:
      case 0x2009:
      case 0x200a:
      case 0x2028:
      case 0x2029:
      case 0x202f:
      case 0x205f:
      case 0x3000:
#if ruby_version_before_2_2()
      case 0x180e:
#endif
          /* found */
          break;
      default:
          return Qfalse;
    }
    s += n;
  }
  return Qtrue;
}

static VALUE
rb_str_blank(VALUE str)
{
  rb_encoding *enc;
  char *s, *e;

  enc = STR_ENC_GET(str);
  s = RSTRING_PTR(str);
  if (!s || RSTRING_LEN(str) == 0) return Qtrue;

  e = RSTRING_END(str);
  while (s < e) {
    int n;
    unsigned int cc = rb_enc_codepoint_len(s, e, &n, enc);

    if (!rb_isspace(cc) && cc != 0) return Qfalse;
    s += n;
  }
  return Qtrue;
}


void Init_fast_blank( void )
{
  rb_define_method(rb_cString, "blank?", rb_str_blank, 0);
  rb_define_method(rb_cString, "blank_as?", rb_str_blank_as, 0);
}
```

It is ten times more performant, 10.5M iter/sec. But looking at the code, we know it's not esay to do it right in C, there are lots of things you need to keep in mind.

But finally let's look the implementation in Rust.

```rust
exten "C" fn fast_blank(buf: Buf) -> bool {
  buf.as_slice().chars().all(|c| c.is_whitespace())
}
```

Much simpler code, thanks to Rust's higher level language features. And it's as performant, 11M iter/sec.

So we can see Rust is really fast, because of its zero-cost abstraction.

## It's safe

To those who is using C/C++ and already have full control of the hardware, you still should try rust if you want to be a more efficient developer. Rust offers safety guarantees, that makes development so much easier.

C/C++ offer great power, but also expose us in front of lots of risks. C can implement extraordinary performance but with lower abstraction and results in human mistakes easily. Like C, C++ can be really unforgiving, even if there is some small mistake, you will get a runtime crash if you are lucky, otherwise you might be trapped in a very unclear situation. If you are using C/C++, You need to worry about the hardware machine, while you are implementing your features, double effort, one output. This was exactly how I felt, when I was a full time C++ dev as my first job.

![](https://img.haoqicat.com/2019041205.jpg)

However, Rust gives us strong safety guarantees. No segment fault, no run time crash, no dangling pointers, no out-of-bound accesses. and data race free. Rust achieves this by certain language features and good compiler support. If ever you do some thing wrong, the compiler will tell you about it.

Hack without fear is Rust's slogan. You do not worry about your program once the compilation is complete.

## It's ergonomic

A lot of people love Ruby, cause it

>Optimize for Programmer Happiness.

Rust also wants the developers to be happier and try its best to be ergonomic.

![](https://img.haoqicat.com/2019041206.jpg)

Rust supports multiple programming paradigms, like generic, imperative, structured. It is also inspired by Haskell, you can do functional programming with rust. You can explicitly define a variable to be mutable, but by default, everything is immutable. That sort of sweetness is not sth C/C++ offers.

![](https://img.haoqicat.com/2019041207.jpg)

Rust has great tooling. It has a npm like system that you can get the ready-made code as packages. Tools are available to take care of your dependency management. Rust also has great build system, that means no more hand made Makefiles.

Great community. Rust is from Mozilla, but more than 4/5 of contributions come from outside Mozilla. Rust compiler has more than 2000 contributors. Dropbox and Canonical,that is the company behind Ubuntu, and other companies are using Rust. Firefox is porting its core components from C++ to Rust. Rust is a true community thing, if you know what I am saying.

## Conclusion

Rust preserves the conveniences of high-level languages in low-level land. It's as fast as C/C++, and as safe and easy to use as higher-level languages like Python/Ruby or Haskell. That's why lots of peope move to rust land from the higher or lower world.

That's all for this episode, if want some discussion, I am happypeter1983 on twitter.

Ref:
- https://medium.com/@Aimeedeer/why-rust-c877fba0ca94
- https://www.youtube.com/watch?v=cDFSrVhnZKo
- https://www.youtube.com/watch?v=_jMSrMex6R0&t=677s
- https://www.youtube.com/watch?v=-Tj8Q12DaEQ
- http://intorust.com/tutorial/why-rust/
