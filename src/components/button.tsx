function Button({ ...props }: React.ComponentProps<"button">) {
    return <button className="rounded-md border border-neutral-300 px-3 py-1.5" {...props} />
}

export default Button
