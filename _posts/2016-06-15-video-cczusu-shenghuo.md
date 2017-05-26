---
layout: post
title:  "小小宣传片"
date:   2016-06-15
excerpt: "常州大学校学生会生活部宣传片"
tag:
- blog
- video
comments: false
---
<iframe width="560" height="315" src="http://v.youku.com/v_show/id_XNzIxNzY0MzEy.html?from=s1.8-1-1.2&spm=a2h0k.8191407.0.0" frameborder="0"> </iframe>

Video embeds are responsive and scale with the width of the main content block with the help of [FitVids](http://fitvidsjs.com/).

Not sure if this only effects Kramdown or if it's an issue with Markdown in general. But adding YouTube video embeds causes errors when building your Jekyll site. To fix add a space between the `<iframe>` tags and remove `allowfullscreen`. Example below:

{% highlight html %}
<iframe width="560" height="315" src="http://v.youku.com/v_show/id_XNzIxNzY0MzEy.html?from=s1.8-1-1.2&spm=a2h0k.8191407.0.0" frameborder="0"> </iframe>
{% endhighlight %}
