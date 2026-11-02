# frozen_string_literal: true

# Every published article needs a plate (GUIDELINES.md, section 2), so a build with
# a post that lacks one stops here. The legacy Pages builder ignores _plugins.
module PlateCheck
  REQUIRED_FIELDS = %w[art art_crop art_alt art_crop_alt art_caption].freeze
  IMAGE_FIELDS = %w[art art_crop].freeze

  def self.problems(post, source)
    missing = REQUIRED_FIELDS.select { |field| post.data[field].to_s.strip.empty? }
    problems = missing.map { |field| "missing #{field}" }

    (IMAGE_FIELDS - missing).each do |field|
      path = post.data[field].to_s
      problems << "#{field} must be an SVG: #{path}" unless File.extname(path).casecmp?(".svg")
      problems << "#{field} file not found: #{path}" unless File.file?(File.join(source, path))
    end

    problems
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  failures = site.posts.docs.reject(&:draft?).filter_map do |post|
    problems = PlateCheck.problems(post, site.source)
    "  #{post.relative_path}: #{problems.join('; ')}" unless problems.empty?
  end
  next if failures.empty?

  raise Jekyll::Errors::FatalException,
        "Every article needs a plate. See section 2 of GUIDELINES.md.\n#{failures.join("\n")}"
end
