import Button from "@/components/button"
import Input from "@/components/input"
import { prisma } from "@/lib/prisma"
import { queryOptions, useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { createServerFn, useServerFn } from "@tanstack/react-start"
import { useState } from "react"

type Task = {
    id: number
    desc: string
}

const getAllTasks = createServerFn({ method: "GET" }).handler(async () => {
    return (await prisma.task.findMany()) as Array<Task>
})

const addTask = createServerFn({ method: "POST" })
    .inputValidator((desc: string) => desc)
    .handler(async ({ data: desc }) => {
        return await prisma.task.create({ data: { desc } })
    })

const deleteTask = createServerFn({ method: "POST" })
    .inputValidator((id: number) => id)
    .handler(async ({ data: id }) => {
        return await prisma.task.delete({ where: { id: id } })
    })

const tasksQueryOptions = queryOptions({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks(),
})

export const Route = createFileRoute("/")({
    component: Page,
    ssr: false,
})

function Page() {
    const queryClient = useQueryClient()
    const serverAddTask = useServerFn(addTask)
    const serverRemoveTask = useServerFn(deleteTask)

    const [text, setText] = useState("")

    const { data: tasks } = useQuery(tasksQueryOptions)

    const addMutation = useMutation({
        mutationFn: (desc: string) => serverAddTask({ data: desc }),
        onSuccess: async () => {
            setText("")
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => serverRemoveTask({ data: id }),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (text) addMutation.mutate(text)
    }

    return (
        <div className="flex min-h-screen w-full">
            <main className="mx-auto flex w-full max-w-[800px] flex-col gap-2 p-4">
                <h1 className="text-4xl font-bold">Tanstack To-Do</h1>
                <p>A simple To-Do app made with Tanstack Start and Bun.</p>
                <form className="flex w-full flex-row gap-2" onSubmit={onSubmit}>
                    <Input
                        disabled={addMutation.isPending}
                        value={text}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                        placeholder="What do you want to do?"
                        type="text"
                        name="desc"
                    />
                    <Button type="submit" disabled={addMutation.isPending}>
                        Create
                    </Button>
                </form>
                <div className="flex flex-col gap-2">
                    {tasks?.map((t) => (
                        <div className="flex flex-row gap-2" key={t.id}>
                            <div className="w-full rounded-md border border-neutral-300 px-2 py-1.5">
                                <p>{t.desc}</p>
                            </div>
                            <Button disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(t.id)}>
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
