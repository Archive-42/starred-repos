import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="ds2viz",
    version="0.1.4",
    author="Donald R. Sheehy",
    author_email="don.r.sheehy@gmail.com",
    description="Don Sheehy's Data Structures Visualizations",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://donsheehy.github.io/ds2viz",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    install_requires=[
                  'svgwrite',
                  'gizeh',
                  'PyYAML',
                 ],
    python_requires='>=3.6',
    include_package_data=True,
)
